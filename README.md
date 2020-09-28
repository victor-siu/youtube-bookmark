# youtube-bookmark

## Icon names

in JSON: <https://raw.githubusercontent.com/fgnass/mdi-json/master/icons.json>
in GUI: <https://materialdesignicons.com/>

## API Endpoints

### columns.php

GET <https://api.fighter.hk/youtube/columns.php>
to get all columns

GET <https://api.fighter.hk/youtube/columns.php?exist>
to get all columns that has at least 1 video related, with a totalVideos count

### videos.php

GET <https://api.fighter.hk/youtube/videos.php>
to get all videos

### submission.php

POST <https://api.fighter.hk/youtube/submission.php>
to submit new youtube video

POST value: url, uid, cid

### users.php

GET <https://api.fighter.hk/youtube/users.php>
to get all users

GET <https://api.fighter.hk/youtube/users.php?exist>
to get all users that has at least 1 video related, with a totalVideos count

GET <https://api.fighter.hk/youtube/users.php?uid=1>
to get the user with uid == 1

### newColumn.php

POST <https://api.fighter.hk/youtube/newColumn.php>
to create a new column

POST value: slug, columnName

### newUser.php

POST <https://api.fighter.hk/youtube/newUser.php>
to create a new user

POST value: username