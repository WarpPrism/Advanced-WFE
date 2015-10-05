/**
 * Created by zhoujh on 2015/9/23.
 */

window.onload = function() {
    var width = window.innerWidth;
    var height = window.innerHeight;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    var camera = new THREE.OrthographicCamera(-(width / 20), (width / 20), (height / 20), -(height / 20), 1, 1000);
    camera.position.set(0, -50, 35);
    camera.lookAt(scene.position);
    scene.add(camera);

    /*var axes = new THREE.AxisHelper(30);
    scene.add(axes);*/

    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, -60, 10);
    scene.add(spotLight);

    var geom = [];
    for (var a = 0; a < 2 * Math.PI; a += 0.02) {
        var A = 6;
        var change = 0;
        var a_geom = new THREE.Geometry();
        for (var i = 0; i < 100; i += 0.1, change++) {
            var point = new THREE.Vector3(i * Math.cos(a), i * Math.sin(a), A * Math.sin(0.7 * (i - Math.PI)));
            a_geom.vertices.push(point);
            if (change >= 20) {
                A *= 0.9;
                change = 0;
            }
        }
        geom.push(a_geom);
    }
    for (var k = 0; k  < geom.length; k++) {
        /*for (var j = 0; j < 2001 - 8; j++) {
            geom[k].faces.push( new THREE.Face3(j, j + 4, j + 8 ));
        }
        geom[k].computeFaceNormals();*/
        var mesh= new THREE.Line( geom[k], new THREE.MeshBasicMaterial({
            color: 0xdddddd
        }));
        scene.add(mesh);
    }

    var stone = new THREE.Mesh(new THREE.SphereGeometry(3, 18, 12), new THREE.MeshLambertMaterial({
    	color: 0xdddddd
    }));
    stone.position.z = 20;
    scene.add(stone);
    renderer.render( scene, camera );
};
