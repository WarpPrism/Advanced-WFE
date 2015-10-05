/**
 * Created by zhoujh on 2015/9/23.
 */
var off = 0;

window.onload = function() {
    alert("Please open this page in Chrome or Firefox, Because IE/Edge doesn't support the GUI controller.\n\n\n请使用Chrome或Firefox打开。");
    var width = window.innerWidth;
    var height = window.innerHeight;

    // Create renderer
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0x444444, 0.1);
    document.body.appendChild(renderer.domElement);

    var scene = new THREE.Scene();

    // Add camera
    var camera = new THREE.OrthographicCamera(-(width / 20), (width / 20), (height / 20), -(height / 20), 1, 1000);
    camera.position.set(0, -50, 35);
    camera.lookAt(scene.position);
    scene.add(camera);

    // Add GUI Controller
    var controls = new function() {
        this.speed = 0.5;
    };
    var gui = new dat.GUI();
    gui.add(controls, 'speed', 0, 1.5);

    // Add stats tool
    function initStats() {
        var stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.left = '0px';
        stats.domElement.style.width = '100px';
        document.getElementById('stats-output').appendChild(stats.domElement);
        return stats;
    }
    var stats = initStats();

    function render() {
        stats.update();
        off += controls.speed;

        var lines = [];
        for (var a = 0; a < 2 * Math.PI; a += 0.03) {
            var A = 4;
            var change = 0;
            var a_geom = new THREE.Geometry();
            for (var i = 0; i < 100; i += 0.5, change++) {
                var point = new THREE.Vector3(i * Math.cos(a), i * Math.sin(a), A * Math.sin(0.7 * (i - off)));
                a_geom.vertices.push(point);
                point = null;
                if (change >= 20) {
                    A *= 0.9;
                    change = 0;
                }
            }
            var a_line = new THREE.Line(a_geom, new THREE.MeshBasicMaterial({
                color: 0x3333aa
            }));
            a_geom = null;
            lines.push(a_line);
            scene.add(a_line);
            a_line = null;
        }
        renderer.render(scene, camera);

        for (var j = 0; j < lines.length; j++) {
            scene.remove(lines[j]);
            lines[j].geometry.dispose();
            lines[j].material.dispose();
            lines[j] = null;
        }

        while (lines.length != 0) {
            lines.pop();
        }
        lines = null;
        requestAnimationFrame(render);
    }

    render();
};
