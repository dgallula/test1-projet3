
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacations`
--
CREATE DATABASE IF NOT EXISTS `vacations` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacations`;

-- --------------------------------------------------------

--
-- 1 Table structure for table `follows`
--

CREATE TABLE `follows` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`userId`, `vacationId`) VALUES
(2, 13),
(2, 2),
(3, 3),
(3, 13),
(3, 1),
(2, 1);

-- --------------------------------------------------------

--
-- 2Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `username`, `password`, `role`) VALUES
(1, 'Admin', 'Admin', 'admin', '12345', '0'),
(2, 'David', 'Gallula', 'dgallula', '12345', '1'),
(3, 'Moshe', 'Perez', 'mperez', '123456', '1'),
(4, 'Nicolas', 'Levy', 'nlevy', '123456', '1'),
(5, 'James', 'lewis', 'jerry', '123456', '1');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationDestination` varchar(100) NOT NULL,
  `vacationDescription` varchar(100) NOT NULL,
  `vacationImage` varchar(100) NOT NULL,
  `fromDate` date NOT NULL,
  `toDate` date NOT NULL,
  `vacationPrice` decimal(10,0) NOT NULL,
  `followers` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationDestination`, `vacationDescription`, `vacationImage`, `fromDate`, `toDate`, `vacationPrice`, `followers`) VALUES
(1, 'Brazil', 'Featuring an outdoor swimming pool with sun loungers, Apartments Klara offers.', 'f49f2c8b-1f56-4e45-987d-e0d2a5c2faa1.jpeg', '0000-00-00', '0000-00-00', '117', '2'),
(2, 'Tel Aviv', 'Located in Split, 300 metres from Znjan Beach and 500 metres from Trstenik', '300f38d4-d7eb-4055-a70b-ede50cb80f2f.jpeg', '2022-03-17', '2022-03-17', '22', '1'),
(3, 'Maldives', 'The Maldives is a tropical island nation known for its beaches, blue lagoons and extensive reefs', '014bbc79-ec24-41cd-aa5f-44f5577e470f.jpeg', '2022-03-08', '2022-03-24', '235', '1'),
(13, 'Hawaii', 'Best vacation!', 'b825dac9-7119-4f1a-803f-55428b011fd7.jpeg', '2022-03-08', '2022-03-17', '222', '2');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

select * FROM FOLLOWS;

select * FROM USERS;

select * FROM VACATIONS;
