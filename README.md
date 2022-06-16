# PlanIt-Frontend 

Backend in: https://github.com/Jennif6r/PlanIt-Backend

## Installation 
There are three different ways to install our application. For all it's required, that java is runing on your system. <br>

### Jar File
For the first you only need to download the executable jar from [here](https://github.com/Jennif6r/PlanIt-Frontend/raw/main/Planit-Frontend-0.0.1-SNAPSHOT.jar).  <br>
Then navigate in that directory and run: ``java -jar Planit-Frontend-0.0.1-SNAPSHOT.jar``. <br> If you don't want to run the jar file by hand, you could use the [sript](https://raw.githubusercontent.com/Jennif6r/PlanIt-Frontend/main/StartApplication.sh). Just put it in the same directory, change the fileending to ``.sh`` and start it. 

If you get the error message shown below, you have to shut down the process on the port 9001 or use the installation gide for maven. 
![error]

If you see that message with the Spring logo, you could start the application on [localhost:9001/plan-it](localhost:9001/plan-it).
![success]

### Maven Installation 
#### Get Maven
To use that installation guide you need a working maven installation. To get maven, download it from [here](https://maven.apache.org/download.cgi) and follow the [installation guide](https://maven.apache.org/install.html). 
#### Get Sourcecode 
First you have to clone our [repo](https://github.com/Jennif6r/PlanIt-Frontend). 

#### Change Port 
If you want to change the port, you need to go into the ``application.properties`` file. It's located in ``src/main/resources`` and change the ``server.port`` to the port number you want. After saving the file you could go on with the installation.

#### Start The Application 
First run ``mvn clean install`` in the project. If you get an error message here, you maybe have to fix a dependancy in the ``pom.xml`` or there is something wrong with your maven installation. When the build is successfull, you could start the spring application on runing ``mvn spring-boot:run``.

When you get the error message that this port is in use, you have to choose a different one or shut down the process listen on that port.

If you see that message with the Spring logo, you could start the application on [localhost:9001/plan-it](localhost:9001/plan-it).
![success]


<!--pictures -->
[error]: https://github.com/Jennif6r/PlanIt-Docs/blob/main/Frontend-Images/error%20port%20used.png
[success]: https://github.com/Jennif6r/PlanIt-Docs/blob/main/Frontend-Images/success%20message.png
 