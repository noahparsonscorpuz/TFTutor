# TFTutor

## A Data-Driven Machine Learning Gameplay Companion

Welcome to TFTutor, your personal companion for mastering Riot's Team Fight Tactics (TFT)!

TFTutor is a personal project born out of my passion for Riot's Team Fight Tactics. As an avid player, I've always been intrigued by the depth and complexity of TFT gameplay. TFTutor is my pursuit to better understand the intricacies of the game and to empower fellow players with data-driven insights to enhance their gameplay experience.

TFTutor is a machine learning-powered gameplay companion designed to analyze TFT matches and provide actionable recommendations and insights. By leveraging the vast amount of gameplay data available, TFTutor aims to help players make informed decisions, optimize their strategies, and ultimately improve their performance on the battlefield.

## Key Features

- Data Collection and Processing: TFTutor collects and processes gameplay data from TFT matches, including match outcomes, player actions, champion compositions, item choices, and more.

- Machine Learning Models: TFTutor utilizes machine learning algorithms to analyze gameplay data and provide recommendations and insights. This includes predicting optimal champion compositions, item builds, and strategies based on the current game state.

- User Interface: TFTutor features a user-friendly interface that allows players to input their gameplay data and receive personalized recommendations and insights. The interface is designed for ease of use and intuitive interaction.

## Current TODO

- Figure out some good UI practices... lol

- Process and present the appropriate data visually (graphs, etc.). 

- Plan on how to implement ML functionalities.

## Credits

- Riot Games API

- CommunityDragon's Docs and CDN

## Running TFTutor on your System

1. Install needed requirements per the requirements.txt file by running:

    - pip install -r requirements.txt

*** Note: please run the script "pip freeze > requirements.txt" when adding new dependencies! ***

2. In the terminal, navigate to the parent directory of "Sever", "TFTutor", etc.

3. Execute the following:

    - cd .\Server\
    - .\venv\Scripts\Activate.ps1
    - python .\main.py

4. Now, in another terminal window, navigate to parent directory of "Sever", "TFTutor" once again.

5. Execute the following: 

    - cd .\TFTutor\
    - npm run dev

6. Finally, navigate to the link shown like below:

PS C:\Users\LocalUser\Documents\React-Vite-Flask\TFTutor> npm run dev
*** Note: path will look like "~\TFTutor> npm run dev" on Linux/macOS environments! ***

> tftutor@0.0.0 dev
> vite


  VITE v5.2.12  ready in 537 ms

  ➜  Local:   http://localhost:5173/ <---- ***LINK HERE***
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

7. Enjoy the wonders of TFTutor!


