# Scheduler
Scheduler is a modern and minimalist course schedule viewer web app built for use at Phillips Exeter Academy. 

# History
This project was developed within the span of a week, intended to replace an older scheduling site that was left unmaintained. Much of the structure and design of this application was borrowed from another one of my projects, Swyft Epsilon.
Though the project was fully functional after a week of development, the application was never deployed because an official scheduling website was developed by the school. Still, this project was a great learning opportunity.

# Stack
This project was developed in two parts, SchedulerAPI and SchedulerOnline. SchedulerAPI is the server of the application built on Sails.js, a popular Rails-inspired Node.js framework. SchedulerOnline is the client of the application built on the Ember.js JavaScript MVC framework. Most of the app was written in ES5, though the client of the app uses the ES6 module syntax.

# How It Works
Scheduler uses a modular and extensible structure for storing schedule data. This system was built independantly of the mechanism used to get the schedule data for the student. This was done so that the input mechanism for getting data could change, without the storage format and client rendering having to change. Data stored in this format is pulled from a MongoDB database, processed on the server and then is displayed on the client.

The application was originally designed to have users enter their classes manually, however this was superceeded by mechanism using a scraping engine to scrape schedule data from student's accounts (with their consent, of course). Schedule data is scraped and then stored in a MongoDB database using Scheduler's schedule format.

The application was also originally intended to have its own authentication system, somewhat based on the one I built for my Swyft Epsilon project. However, this was replaced by a mechanism using the same scraping engine developed for getting scheduling data, for authentication. 

# Future
As of December 2015, due to changes made to Exeter's internal websites, the scraping engine in this application is no longer functional, making the current implementation of the application not functional. However, because the scraping engine was developed in a modular fashion, it can be removed and replaced with another mechanism for authentication and getting schedule data with little to no changes needed for the client.

Though this web app was specifically designed for use at Phillips Exeter Academy, the modular and extensible structure of the app means that it can be extended and used in a variety of different ways.

#License
Copyright 2015 Bharat Arimilli.

