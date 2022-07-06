import { useEffect, useState } from "react";
import {
    VictoryBar,
    VictoryChart,
    VictoryTheme,
    VictoryAxis,
} from "victory";
import VacationModel from "../../../Models/VacationModel";
import vacationsService from "../../../Services/VacationService";
import "./Chart.css";


function Chart(): JSX.Element {
    const [data, setData] = useState<VacationModel[]>([]);

    useEffect((async () => {
        try {
            const data = await vacationsService.getAllVacations();
            console.log(data);
            
            if (data.length > 0) {
                setData(data);
            }
        } catch (err: any) {
            alert(err.message);
        }
    }) as any, []);

    return (
        <div className="Chart">
            {data && <><h2>Followers per vacation</h2>
                <VictoryChart
                    animate={{
                        duration: 500,
                        onLoad: { duration: 300 }
                    }}
                    domainPadding={{ x: 0 }}
                    theme={VictoryTheme.material}
                >
                    <VictoryAxis
                        style={{
                            tickLabels: {
                                fill: `rgb(50, 140, 182)`, //CHANGE COLOR OF Y-AXIS LABELS
                            },
                            axis: { stroke: 'none' },
                            grid: {
                                stroke: 'none' //CHANGE COLOR OF X-AXIS GRID LINES
                            }
                        }}
                    />
                    <VictoryBar
                        barRatio={1}
                        cornerRadius={0} // Having this be a non-zero number looks good when it isn't transitioning, but looks like garbage when it is....
                        style={{ data: { fill: `rgb(50, 140, 182)`, fillOpacity: 0.7 }, labels: { fill: `rgb(50, 140, 182)` } }}
                        alignment="middle"
                        data={data}
                        x="vacationDestination"
                        y="followers"
                        labels={({ datum }) => datum.followers}
                    />
                </VictoryChart> </>}
        </div>
    );
}


export default Chart;