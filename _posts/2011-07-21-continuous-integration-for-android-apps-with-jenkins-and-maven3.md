---
layout: post
title: "Continuous Integration for Android Apps with Jenkins and Maven3"
description: ""
category: 
tags: []
---
{% include JB/setup %}

Pre-requisites
--------------

* [Ubuntu](http://www.ubuntu.com/) (I’m using 11.04)
* [Jenkins](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Ubuntu) (I’m using v1.4.21)
* [Android SDK](http://developer.android.com/sdk/installing.html) (I’m using r12)
* [Git](http://git-scm.com/)

Installing Xvnc
---------------

We need to run Android’s emulator to test the interface. For such, we need a X
server running on the machine. The easier way to do so on a headless box is
using Xvnc. To install it, do:

    $ sudo apt-get install vnc4server
    
If you don’t have a window manager (GNOME, KDE, etc.), install fluxbox, a lightweight WM:

    $ sudo apt-get install fluxbox
    
After this, we have to set a password for the vncserver.

    $ sudo su jenkins
    $ vncserver

    You will require a password to access your desktops.

    Password:
    Verify:

    New 'luna:1 (jenkins)' desktop is luna:1

    Creating default startup script /var/lib/jenkins/.vnc/xstartup
    Starting applications specified in /var/lib/jenkins/.vnc/xstartup
    Log file is /var/lib/jenkins/.vnc/luna:1.log

Configuring git
---------------

We need to configure Jenkins’ user git name and e-mail. To do so, open a
terminal and do:

    $ sudo su jenkins
    $ git config --global user.name "Jenkins"
    $ git config --global user.email "jenkins@no-email.com"

Configuring Jenkins
-------------------

If you haven’t changed Jenkins’ configurations, it’s server is listening at
http://localhost:8080. Open it and click into Manage Jenkins -> Configure
System. Scroll down to the Android subsection, and write your Android SDK path
into the text input. Then, find the Maven subsection, click into Add Maven and
set the values as:

![Install maven3 using blah](/assets/media/03-install-maven3-using-jenkins.png)

Also, go to Jenkins’ main page then Manage Jenkins -> Manage Plugins and, at the
Available tab, look for the plugins Hudson Xvnc, Jenkins Zentimestamp, Android
Emulator and Jenkins GIT. Check every one of them and click Install. At the
following screen, check Restart Jenkins when installation is complete and no
jobs are running.

![Jenkins Plugins](/assets/media/plugins.png)

Adding a project to Jenkis
--------------------------

We’re going to add the _morseflash_ example from
[maven-android-plugin](http://code.google.com/p/maven-android-plugin/) samples to
our Jenkis, to check if everything is configured properly.

* Download the samples from https://github.com/jayway/maven-android-plugin-samples/tarball/alpha;
* Extract into /tmp (or any other folder) and rename
  jayway-maven-android-plugin-samples-3fe4aed to samples (just to make it easier);
* Create a git repository inside the morseflash subfolder using:
    $ git init
    $ git add *
    $ git commit -a -m "Initial commit."
* Edit the line 16 in _pom.xml_, changing from _${maven.build.timestamp}_ to _${BUILD&#95;ID}_;
* Open http://localhost:8080 and click in New Job;
* Write “morseflash” in Job name, select Build a maven2/3 project and click OK;
* Configure it like the following image and click Save:

![Morseflash Jenkins configuration](/assets/media/morseflash.png)

After this, you can wait a little bit and Jenkins will automatically build the
first version, or you can click in Build Now. Either way, a new build will
appear at the Build History block in the bottom left of the page:

![Build History](/assets/media/buildhistory.png)

Click on its link, then click in _Console Output_. You should see a lot of
messages passing by and, in the end, you should see something like:

    [INFO] ------------------------------------------------------------------------
    [INFO] Reactor Summary:
    [INFO]
    [INFO] MorseFlash Parent ................................. SUCCESS [1.319s]
    [INFO] MorseFlash - Library .............................. SUCCESS [5.048s]
    [INFO] MorseFlash - App .................................. SUCCESS [4.028s]
    [INFO] MorseFlash - Instrumentation Test ................. SUCCESS [12.702s]
    [INFO] ------------------------------------------------------------------------
    [INFO] BUILD SUCCESS
    [INFO] ------------------------------------------------------------------------
    [INFO] Total time: 25.714s
    [INFO] Finished at: Thu Jul 21 14:05:31 BRT 2011
    [INFO] Final Memory: 19M/197M
    [INFO] ------------------------------------------------------------------------
    channel stopped
    [android] Stopping Android emulator
    [android] Archiving emulator log
    Terminating xvnc.
    $ vncserver -kill :10
    Killing Xvnc4 process ID 25580
    Finished: SUCCESS

Bingo! You now have a Continuous Integration infrastructure for Android apps.
Every minute Jenkins pools git and, if it finds something new, rebuilds
everything. If something goes wrong, check if you did all the steps of the
tutorial. If you can’t figure it out, ask a question in the comments section and
I’ll try to help.

References
----------

* [Installing the Android SDK](http://developer.android.com/sdk/installing.html)
* [Installing Jenkins on Ubuntu](https://wiki.jenkins-ci.org/display/JENKINS/Installing+Jenkins+on+Ubuntu)
* [Maven Android Plugin](http://code.google.com/p/maven-android-plugin/)
* [Run UI tests on a headless Jenkins / Hudson Continuous Integration server
   running Ubuntu](http://blog.dahanne.net/2011/07/18/run-ui-tests-on-a-headless-jenkins-hudson-continuous-integration-server-running-ubuntu)
