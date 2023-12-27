document.addEventListener("DOMContentLoaded", function () {
    // Our DynamoDB configuration set up
    AWS.config.update({ region: '' });
    const dynamoDB = new AWS.DynamoDB();
    const tableName = '';

    // Function to fetch data from Our DynamoDB
    function fetchData() {
        const params = {
            TableName: tableName,
            Key: {
                '': { S: 'the key value should go in here' }
            }
        };

        dynamoDB.getItem(params, (err, data) => {
            if (err) {
                console.error('Error fetching data from DynamoDB:', err);
            } else {
                // Transform DynamoDB data if needed and update the web page
                updateDashboard(data.Item);
            }
        });
    }

    // This Function should update our web page with fetched data
    function updateDashboard(data) {
        const dashboardSection = document.getElementById('dashboard');

        // Clear previous content
        dashboardSection.innerHTML = '';

        // Create and append elements to display the data
        const rawDataElement = document.createElement('pre');
        rawDataElement.textContent = JSON.stringify(data, null, 2);

        // logic to extract and display specific attributes as needed

        dashboardSection.appendChild(rawDataElement);
        dashboardSection.appendChild(interpretationElement);
        dashboardSection.appendChild(responseActionsElement);
        dashboardSection.appendChild(overallStatusElement);
        dashboardSection.appendChild(overallActionElement);
    }

    // Fetch data when the page is loaded
    fetchData();

    // Optionally, i set up an interval to periodically fetch data (every 2 minutes)
    setInterval(fetchData, 2 * 60 * 1000);
});
