# firesell

## Overview

This is the 4th project as part of the software engineering immersive course at General Assembly London.
The assignment was to create a full-stack website with React and Flask.
The project was to be completed **individually** within **5 days** over 2 weeks, for a total of 30 hours.

Preview: ![preview-screen](./readme-assets/preview-screen.png)

## Technologies used 

- Flask
- React
- Marshmallow
- Python
- SQLAlchemy
- HTML
- CSS
- Git and GitHub
- Bcrypt

## Approach

The idea was to make a site where developers and creators can sell software and content. Here are a few stories and wireframes I put together: 
![miro-screen](./readme_assets/wireframing.png)

I also did a database diagram:
![miro-screen](./readme_assets/D-diagram.png)

Association tables for Product / Category and OrderLines took some time due to circular imports and the added Quantity field on the OrderLine. 

## Timeline
- Day 1: Data models
- Day 2: Join and association tables, serializers
- Day 3: Controllers, Secure Route
- Day 4: Controllers, frontend, UI library
- Day 5: Promise.all on the frontend


### Build:
#### MVP Roadmap

#### Initial Backlog

#### Backlog

#### Stretchgoals

#### MVP done

--------
Final version of the newsfeed:
![Store](./)

## Bugs, Wins & Learnings
Currently due to some configuration changes in the database hosting login and register can be buggy.
Checking out doesn't create an order on the backend.

The big wins were getting all the database tables right on the backend.
On the frontend it was the checkout page where the user can delete items and checkout.

The checkout needs to be completed on the backend, ratings code needs to be completed on the both the frontend and the backend.

## Credits
- Logo: Dimitar Vidolov (via canva.com).
--------
