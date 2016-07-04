console.log('\'Allo \'Allo!');

var panorama, viewer;

        panorama = new PANOLENS.ImagePanorama( 'images/IMG_5818-Panorama-Featured-1024x512.jpg' );  // test images

        viewer = new PANOLENS.Viewer({
                    controlBar: true,           // Vsibility of bottom control bar
                    controlButtons: [],         // Buttons array in the control bar. Default to ['fullscreen', 'navigation', 'vr', 'video']
                    autoHideControlBar: false,  // Auto hide control bar
                    autoHideInfospot: true,     // Auto hide infospots
                    horizontalView: false,      // Allow only horizontal camera control
                    cameraFov: 60,              // Camera field of view in degree
                    reverseDragging: false,     // Reverse orbit control direction
                    enableReticle: false,       // Enable reticle for mouseless interaction
                    dwellTime: 1500,            // Dwell time for reticle selection in millisecond
                    autoReticleSelect: true,    // Auto select a clickable target after dwellTime
                    passiveRendering: false,    // Render only when control triggered by user input 
                });
        viewer.add( panorama );
