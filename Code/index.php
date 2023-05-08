<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="data-container">
        <div class="search-city">
            <input type="text" placeholder="Enter a City" spellcheck="false">
            <button><img src="images/search.png"></button>
        </div>
        <div class="error">
            <p>Invalid City Name</p>
        </div>
        <div class="weather">
            <img src="" class="weather-icon">
            <p class="weather-condition">Clear</p>
            <h1 class="temp"></h1>
            <h2 class="city">El Paso</h2>
            <h3 class="date"> </h3>
            <div class="details">
                <div class="col">
                    <img src="images/humidity.png">
                    <div>
                        <p class="humidity"></p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="col">
                    <div>
                        <img src="images/pressure.png">
                        <p class="pressure"></p>
                        <p>Pressure</p>
                    </div>
                </div>
                <div class="col">
                    <img src="images/wind.png">
                    <div>
                        <p class="wind"></p>
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="main.js"></script>
</body>

</html>
<?php
$apiKey = 'd14b802f19f5f929d5d60fd290bf5922';
$City = 'El Paso';
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'portfolio';
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}
$link = "https://api.openweathermap.org/data/2.5/weather?q=$City&appid=$apiKey&units=metric";
$return = file_get_contents($link);
$data = json_decode($return, true);
$date = date('Y-m-d');
$select = "SELECT * FROM weather WHERE city='$City' AND date='$date'";
$result = mysqli_query($conn, $select);
if (mysqli_num_rows($result) > 0) {
    $select = "UPDATE weather SET temperature={$data['main']['temp']}, description='{$data['weather'][0]['description']}' WHERE city='$City' AND date='$date'";
    if (!mysqli_query($conn, $select)) {
        die('Error updating data: ' . mysqli_error($conn));
    }
} else {
    $select = "INSERT INTO weather (city, date, temperature, description) VALUES ('$City', '$date', {$data['main']['temp']}, '{$data['weather'][0]['description']}')";
    if (!mysqli_query($conn, $select)) {
        die('Error inserting data: ' . mysqli_error($conn));
    }
}
$select = "SELECT * FROM weather WHERE city='$City' AND date='$date'";
$result = mysqli_query($conn, $select);
$row = mysqli_fetch_assoc($result);
$temperature = $row['temperature'];
$description = $row['description'];
$select = "SELECT * FROM weather WHERE city='$City' AND date<'$date' ORDER BY date DESC LIMIT 6";
$result = mysqli_query($conn, $select);
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
if (count($rows) > 0) {
    $output = '<h2>Past Forecasts</h2><table><tr><th>Date</th><th>   Temperature</th><th>Description</th></tr>';
    foreach ($rows as $row) {
        $output .= '<tr><td>' . $row['date'] . '</td><td>' . $row['temperature'] . '</td><td>' . $row['description'] . '</td></tr>';
    }
    $output .= '</table>';
} else {
    $output = "No data found for $City.";
}
mysqli_close($conn);
echo $output;
?>