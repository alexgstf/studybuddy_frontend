---
layout: base
title: Quiz Leaderboard
permalink: /studybuddy/leaderboard
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Leaderboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Poppins', sans-serif !important;
            margin: 0 !important;
            padding: 0 !important;
            background: linear-gradient(135deg, #6a11cb, #2575fc) !important;
            color: #fff !important;
            overflow-x: hidden !important;
        }

        header {
            background: rgba(255, 255, 255, 0.1) !important;
            backdrop-filter: blur(10px) !important;
            padding: 1rem 2rem !important;
            display: flex !important;
            justify-content: space-between !important;
            align-items: center !important;
            position: sticky !important;
            top: 0 !important;
            z-index: 1000 !important;
        }

        header h1 {
            margin: 0 !important;
            font-size: 2rem !important;
        }

        .back-home {
            display: inline-block !important;
            margin: 1rem auto !important;
            margin-right: 1% !important;
            padding: 0.8rem 2rem !important;
            font-size: 1rem !important;
            font-weight: bold !important;
            color: #fff !important;
            background: rgba(255, 255, 255, 0.2) !important;
            border: 1px solid #fff !important;
            border-radius: 8px !important;
            text-decoration: none !important;
            transition: all 0.3s ease !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
        }

        .back-home:hover {
            background: rgba(255, 255, 255, 0.35) !important;
            color: #000 !important;
            transform: scale(1.05) !important;
        }

        .leaderboard-container {
            max-width: 800px !important;
            margin: 2rem auto !important;
            background: rgba(255, 255, 255, 0.1) !important;
            padding: 2rem !important;
            border-radius: 10px !important;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
            text-align: center !important;
        }

        table {
            width: 100% !important;
            border-collapse: collapse !important;
            margin: 1rem 0 !important;
        }

        th, td {
            padding: 1rem !important;
            border: 1px solid #fff !important;
            text-align: left !important;
        }

        td {
            background:rgba(0,0,0,0.3) !important;
        }

        th {
            background: rgba(255, 255, 255, 0.2) !important;
        }

        tr:nth-child(even) {
            background: rgba(255, 255, 255, 0.1) !important;
        }
    </style>
</head>
<body>
    <header>
        <h1>Quiz Leaderboard</h1>
        <a href="quizhome.html" class="back-home">Back to Quiz Homepage</a>
    </header>

    <main>
        <div class="leaderboard-container">
            <table class="leaderboard">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Username</th>
                        <th>Level</th>
                        <th>XP</th>
                    </tr>
                </thead>
                <tbody id="leaderboard-body">
                    <!-- Leaderboard data will be inserted here -->
                </tbody>
            </table>
        </div>
    </main>
    <script type="module">
        import { pythonURI, fetchOptions } from "{{site.baseurl}}/assets/js/api/config.js";

        document.addEventListener("DOMContentLoaded", async () => {
            try {
                const response = await fetch(`${pythonURI}/api/userstats/leaderboard`, {
                    ...fetchOptions,
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch leaderboard data');
                }

                const leaderboardData = await response.json();
                const leaderboardBody = document.getElementById('leaderboard-body');

                leaderboardData.sort((a, b) => b.level - a.level || b.xp - a.xp);

                leaderboardData.forEach((user, index) => {
                    console.log("SKibidi");
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${index + 1}</td>
                        <td>${user.username}</td>
                        <td>${user.level}</td>
                        <td>${user.xp}</td>
                    `;
                    leaderboardBody.appendChild(row);
                });
            } catch (error) {
                console.error('Error fetching leaderboard data:', error);
            }
        });
    </script>
</body>
</html>
