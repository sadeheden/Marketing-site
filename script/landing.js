document.getElementById('editForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the form values
    var backgroundColor = document.getElementById('backgroundColor').value;
    var textContent = document.getElementById('textContent').value;
    var photoUrl = document.getElementById('photoUrl').value;
    
    // Apply changes to the iframe content
    var iframe = document.querySelector('.preview-section iframe');
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    
    iframeDoc.body.style.backgroundColor = backgroundColor;
    
    var heroContent = iframeDoc.querySelector('.hero-content');
    if (heroContent) {
        var h1 = heroContent.querySelector('h1');
        if (h1) h1.textContent = textContent;
        
        var img = iframeDoc.querySelector('.hero-background img');
        if (img) img.src = photoUrl;
    }
});
