let panorama = new PANOLENS.ImagePanorama('images/PANO_20160708_135156-01.jpeg'); // test images

let infospot = new PANOLENS.Infospot(350, PANOLENS.DataImage.Info);
infospot.position.set(3478.7, -126.45, -3575.66);
infospot.addHoverText('國影中心預定地');

panorama.add(infospot);

let viewer = new PANOLENS.Viewer({
    container: document.body, // A DOM Element container. Default: document.body
    controlBar: false, // Vsibility of bottom control bar
    controlButtons: ['fullscreen'], // Buttons array in the control bar. Default to ['fullscreen', 'navigation', 'vr', 'video']
    autoHideControlBar: true, // Auto hide control bar
    autoHideInfospot: false, // Auto hide infospots
    horizontalView: false, // Allow only horizontal camera control
    cameraFov: 60, // Camera field of view in degree
    reverseDragging: false, // Reverse orbit control direction
    enableReticle: false, // Enable reticle for mouseless interaction
    dwellTime: 1500, // Dwell time for reticle selection in millisecond
    autoReticleSelect: true, // Auto select a clickable target after dwellTime
    passiveRendering: false, // Render only when control triggered by user input
});

viewer.add(panorama);

viewer.addUpdateCallback(function() {
  panorama.rotation.y += 0.001;
});
