## AIW Works

### Assessment: Blood Donation Web Application

### Installation:

1. [Install Docker Compose](https://docs.docker.com/compose/install/)

2. Clone this repository

`git clone https://github.com/ShajidJeshan/AIW-Works-Blood-Donation.git`

3. Open console and go to the directory folder `cd AIW-Works-Blood-Donation`


#### Backend

1. Create Super User using `docker-compose run --rm app sh -c "python manage.py createsuperuser"`

2. Add SuperUser with Login Credentials and go to `http://127.0.0.1:8000/`

3. Use `CRTL+c` to exit the Django Container.


#### Frontend

1. Create [React App](https://github.com/facebook/create-react-app)

2. In the console,

`cd frontend`

`npx create-react-app .`

3. Go to `http://127.0.0.1:3000`

3. Use `CRTL+c` to exit the React Container.

### Run the Containers
`docker-compose up -d`

## Details

This app includes 03 services:
1. data - PostgreSQL Database
2. app - Django REST Framework with Centralized Logging
3. frontend - React, MaterialUI
