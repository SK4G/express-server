#!/bin/bash
#set -e
##################################################################################################################
# Author 	: 	Erik Dubois
# Website 	: 	https://www.erikdubois.be
# Website	:	https://www.arcolinux.info
# Website	:	https://www.arcolinux.com
# Website	:	https://www.arcolinuxd.com
# Website	:	https://www.arcolinuxforum.com
##################################################################################################################
#
#   DO NOT JUST RUN THIS. EXAMINE AND JUDGE. RUN AT YOUR OWN RISK.
#
##################################################################################################################
# change a commit comment
# git commit --amend -m "more info"
# git push --force origin

echo "Deleting the work folder if one exists"
[ -d work ] && rm -rf work

# checking if I have the latest files from github
echo "Checking for newer files online first"
git pull

workdir=$(pwd)
echo "getting latest .bashrc"
wget https://raw.githubusercontent.com/arcolinux/arcolinux-root/main/etc/skel/.bashrc-latest -O $workdir/archiso/airootfs/etc/skel/.bashrc


# Below command will backup everything inside the project folder
git add --all .

# Give a comment to the commit if you want
echo "####################################"
echo "Write your commit comment!"
echo "####################################"

read input

# Committing to the local repository with a message containing the time details and commit text

git commit -m "$input"

# Push the local files to github

git push -u origin main


echo "################################################################"
echo "###################    Git Push Done      ######################"
echo "################################################################"
