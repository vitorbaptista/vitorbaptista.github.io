---
layout: post
title: "How to access the host's Docker Socket without root"
description: ""
category: 
tags: ['docker']
---

I needed to run a Docker container from inside another container. While it's
possible to run [Docker inside Docker][docker-inside-docker], the recommended
way is running siblings containers. The challenge now is how to create a Docker
container in the host machine from inside another Docker container.

It's easy in theory. You just have to map the host's `/var/run/docker.sock` to
the container's, like:

```
docker run -v /var/run/docker.sock:/var/run/docker.sock IMAGE
```

If the Docker binary is installed in that container, any command like `docker
ps` will actually return the containers running in the host. The problem is that
only the container's `root` user is able to run those commands. This is because
`/var/run/docker.sock` is only readable by `root` and the `docker` group (if you
created this group, if not check [this tutorial][create-docker-group]). To run
as a regular user, we need to add our user inside the container to the `docker`
group in the host. This is where things start getting messy. Let's see the
permissions for `/var/run/docker.sock` via the host machine and inside the
container:

```
$ ls -lah /var/run/docker.sock
srw-rw---- 1 root docker 0 Jan 13 16:44 /var/run/docker.sock
$ docker run -v /var/run/docker.sock:/var/run/docker.sock ubuntu ls -lah /var/run/docker.sock
srw-rw---- 1 root 999 0 Jan 13 19:44 /var/run/docker.sock
```

Notice that the group is named `docker` in the host, and `999` in the container?
This happens because the group exists only on the host, the container only sees
that the file is owned by group with GID (group ID) number 999, but doesn't know
its name. To be able to access this file, we need to:

1. Create a group inside the container **with the same GID as in the host**;
2. Add our non-root user to this group;
3. Run the rest of the commands as the non-root user.

This can't be done at image build time because the GID depends on where the
container is running. It's `999` on my machine, but can be another number in
yours. We need to do this when the machine is ran with a script like:

```bash
#!/usr/bin/env bash
# Based on https://github.com/jenkinsci/docker/issues/196#issuecomment-179486312

# This only works if the docker group does not already exist

DOCKER_SOCKET=/var/run/docker.sock
DOCKER_GROUP=docker
REGULAR_USER=ubuntu

if [ -S ${DOCKER_SOCKET} ]; then
    DOCKER_GID=$(stat -c '%g' ${DOCKER_SOCKET})
    groupadd -for -g ${DOCKER_GID} ${DOCKER_GROUP}
    usermod -aG ${DOCKER_GROUP} ${REGULAR_USER}
fi

# Change to regular user and run the rest of the entry point
su ${REGULAR_USER} -c "/usr/bin/env bash runner.sh ${@}"
```

This creates a `docker` group with the same GID as the one in
`/var/run/docker.sock` and assign the user `REGULAR_USER` to it. The last step
is to switch to the non-root user and continue with whatever process you were
running. In this example, I'm running `runner.sh` and giving it whatever
arguments we received. It'll be able to run any Docker command as if it was the
host.

Be aware that [there're security implications][docker-sock-security] in allowing
containers to access `/var/run/docker.sock`. Make sure you trust the containers'
code.

[docker-inside-docker]: https://blog.docker.com/2013/09/docker-can-now-run-within-docker/
[create-docker-group]: https://docs.docker.com/engine/installation/linux/ubuntulinux/#/manage-docker-as-a-non-root-user
[dweomer-script-source]: https://github.com/jenkinsci/docker/issues/196#issuecomment-179486312
[docker-sock-security]: https://raesene.github.io/blog/2016/03/06/The-Dangers-Of-Docker.sock/
