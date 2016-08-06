---
title: Find largest folders size in GNU/Linux
author: jonalvarezz
date: 2016-8-6 16:08
template: article.jade
---

You can see your disk available space using `df in your console:
```
df -h
```

Sample output:
```
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1        30G  29.9G   25G  99% /
dev             492M     0  492M   0% /dev
run             500M  212K  500M   1% /run
tmpfs           500M     0  500M   0% /dev/shm
tmpfs           500M     0  500M   0% /sys/fs/cgroup
```

To find the folder and files with largest size you can use `du`
```
# cd /
# du -hsx * | sort -rh | head -10
```

This will output the top 10 folders with larger size. Now on you can use `cd`
to get into each folder and excecute `du` again and going deeper to find the
folders and files which are occupying your disk space.

Generally you will land into `/var/log/`. If so, you can delete that files
safely just make sure you dont delete folders. I use to delete the log file and
create a empty new one because some programms may asume the file exist. i.e.
```
# rm unnecesarry-and-large-file.log
# touch unnecesarry-and-large-file.log
```

make sure to also restore the same file permissions, user and group.

Btw, if you find `mysql` had very large files named like `mysql-bin.***` Its 
safer to use mysql purge feature:
```
$ mysql -u root -p 
> PURGE BINARY LOGS BEFORE '2016-08-01';
```
