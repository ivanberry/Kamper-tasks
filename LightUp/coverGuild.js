var coverGuide = function(cover, target) {
    var body = document.body, doc = document.documentElement;

    if(cover && target) {
        //get target size(width/height)
        var targetWidth = target.clientWidth,
            targetHeight = target.clientHeight;

        //page size
        var pageHeight = doc.scrollHeight,
            pageWidth = doc.scrollWidth;

        //offset of target
        var offsetTop = target.getBoundingClientRect().top + (body.scrollTop || doc.scrollTop),
            offsetLeft = target.getBoundingClientRect().left + (body.scrollLeft || doc.scrollLeft);


        //set size and border-width
        cover.style.width = targetWidth + 'px';
        cover.style.height = targetHeight + 'px';
        cover.style.borderWidth = offsetTop + 'px ' + (pageWidth - targetWidth - offsetLeft) + 'px ' + (pageHeight - targetHeight - offsetTop) + 'px ' + offsetLeft + 'px ';

        cover.style.display = 'block';

        //resize
        if(!cover.isResizeBind) {
            window.addEventListener('resize', function() {
                coverGuide(cover, target);
            });
        }
    }
};

var elCover = document.getElementById('cover'),
    arrElement = document.querySelectorAll('.target');
    index = 0;

coverGuide(elCover, arrElement[index]);

elCover.onclick = function() {
    index++;
    if(!arrElement[index]) {
        index = 0;
    }
    coverGuide(elCover, arrElement[index]);
};