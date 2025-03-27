(function () {
    var preTag = document.getElementById('donut');

    
    var A = 1;
    var B = 1;
    var R1 = 1;
    var R2 = 2;
    var K1 = 150;
    var K2 = 5;

    
    function renderAsciiFrame() {
        var b = []; 
        var z = []; 

        var width = 280; 
        var height = 160; 

        A += 0.07; 
        B += 0.03; 
        
        var cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        
        for (var k = 0; k < width * height; k++) {
            
            b[k] = k % width == width - 1 ? '\n' : ' ';
            
            z[k] = 0;
        }

        
        for (var j = 0; j < 6.28; j += 0.07) {
            var ct = Math.cos(j); 
            var st = Math.sin(j); 

            for (var i = 0; i < 6.28; i += 0.02) {
                var sp = Math.sin(i); 
                cp = Math.cos(i), 
                    h = ct + 2, 
                    
                    D = 1 / (sp * h * sA + st * cA + 5),
                    
                    t = sp * h * cA - st * sA;

                
                var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

                
                var o = x + width * y;
                
                var N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                
                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
                }

            }

        }

        
        preTag.innerHTML = b.join('');

    }

    
    function startAsciiAnimation() {
        
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    renderAsciiFrame(); 
    
    if (document.all) {
        
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        
        window.addEventListener('load', startAsciiAnimation, false);
    }

    
    window.addEventListener('resize', renderAsciiFrame);
})();