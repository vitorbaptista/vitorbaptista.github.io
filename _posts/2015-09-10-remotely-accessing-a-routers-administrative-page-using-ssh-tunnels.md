---
layout: post
title: "Remotely accessing a router's administrative page using SSH tunnels"
tags: [linux]
---

Before moving to the UK, I left a Raspberry Pi running on my parent's home back
in Brazil. It's working as a personal server for Asterisk and a few other uses.
As it's not directly connected to the Internet, I had to forward a few ports on
my router to be able to SSH into it. The issue happened when I needed to change
these configurations.

For security reasons, I didn't activate the router's "Remote Management"
functionality, so its admin page is only accessible through the local network.
Luckily, I can access this page through the Raspberry Pi using a SSH tunnel.

## SSH Tunnel

SSH allows us to redirect the traffic the received in a port in your local
machine to another port in another machine. It works like:

> YOU --------> MIDDLE-MACHINE --------> DESTINATION

This is a SSH tunnel. This can be seen as a simple VPN or a proxy. It allows us
to connect to any machine that the MIDDLE-MACHINE is able to, with the useful
side-effect of encrypting all traffic between us and the MIDDLE-MACHINE. In my
usage, this schema looked like:

> My notebook --------> Raspberry Pi --------> Router

The command needed to create this tunnel is:

> ssh -N -L 3000:ROUTER-IP:80 RASPBERRY-PI-IP

This will open the port 3000 on my notebook which, when accessed, redirects the
traffic to the router's port 80 going through my Raspberry Pi. I selected port
3000 arbitrarily, it could've been any other free port. The "-N" option is to
avoid opening a shell connection to the Raspberry Pi, you can safely leave it
out.

After running this command, I can access the router's administrative interface
by going to http://localhost:3000.

## Hard-coded redirects

Although I was able to access my router's admin page, I had another problem:
upon log in, it would redirect me to http://192.168.0.1. This address is
outside of the tunnel, so it didn't work (404 error).

To solve this, I had a simple idea: modify my notebook's local IP to
192.168.0.1 and create the tunnel on the local port 80 (instead of 3000). To do
this, I needed to do:

> sudo ifconfig eth0 192.168.0.1

> sudo -E ssh -L 80:192.168.0.1:80 RASPBERRY-PI-IP

I had to use `sudo` because Linux doesn't allow regular users to open ports
below 1024. I used `sudo -E` because I connect to the Raspberry using SSH keys,
which are on my user (and not on root). What `sudo -E` does is preserve the
current environment's variables, which makes SSH to keep using my user's keys.

## SSH Tunnels on other network interfaces

By default, SSH only creates tunnels on the local interface (i.e. localhost).
This is a safety measure, to restrict others on the same network as you (or
worse, the Internet) from using the tunnel. To force SSH to bind on the actual
interface, we have to do:

> sudo -E ssh -L 192.168.0.1:80:192.168.0.1:80 RASPBERRY-PI-IP

This creates a tunnel on the local interface 192.168.0.1:80 to the machine at
192.168.0.1:80 at Raspberry Pi's network.

That's it! We can now access the router's administrative page as if we were on
the local network.
