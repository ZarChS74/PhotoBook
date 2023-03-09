const {Tags, PhotoTags} = require('../models');

function tagsFunction(photo, tags, cb) {
    tags = tags.split(' ');
    const promises =  tags.map(el => Tags.findOne({where : {tagName : el}}));
    Promise.all(promises)
        .then(foundTags => {
            foundTags.forEach((el,i) => {
                if (el) {
                    PhotoTags.create({PhotoId : photo.id, TagId : el.id});
                } else {
                    Tags.create({tagName : tags[i]})
                        .then(newTag => PhotoTags.create({PhotoId : photo.id, TagId : newTag.id}));
                }
            })
            cb(null);
        })
        .catch(err => cb(err));
}

module.exports = tagsFunction;