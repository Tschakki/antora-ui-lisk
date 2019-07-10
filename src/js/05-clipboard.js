document.addEventListener('DOMContentLoaded', function() {
    var pre = document.getElementsByTagName('pre');
    for (var i = 0; i < pre.length; i++) {
        var b = document.createElement('button');
        //var img = document.createElement('img');
        //img.src ='copy.png';
        b.className = 'clipboard';
        //b.textContent = 'Copy';
        if (pre[i].childNodes.length === 1 && pre[i].childNodes[0].nodeType === 3) {
            var div = document.createElement('div');
            div.textContent = pre[i].textContent;
            pre[i].textContent = '';
            pre[i].appendChild(div);
        }
       // b.appendChild(img);
        pre[i].appendChild(b);
    }
    new ClipboardJS('.clipboard', {
        target: function(b) {
            var p = b.parentNode;
            return p.className.includes("hljs")
                ? p.getElementsByClassName("code")[0]
                : p.childNodes[0];
        }
    }).on('success', function(e) {
        e.clearSelection();
        e.trigger.textContent = 'Copied';
        e.trigger.style.background = 'transparent';
        setTimeout(function() {
            e.trigger.textContent = '';
            e.trigger.style.background = 'url(_/img/copy.png)';
            e.trigger.style['background-size'] = 'cover';
            e.trigger.style['background-repeat'] = 'no-repeat';
        }, 2000);
    });
});
