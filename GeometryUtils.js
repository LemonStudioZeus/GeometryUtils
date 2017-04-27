(function(Export) {
    var GeometryUtils = Export.GeometryUtils || {};
    GeometryUtils.splitConnectComponent = function(geometry) {
        if (geometry instanceof Export.BufferGeometry) {
            var _geometry = new Geometry()
            _geometry.fromBufferGeometry(geometry);
            geometry = _geometry;
        }

        geometry.mergeVertices();

        var face_sets = [];

        var faces = geometry.faces;

        for (var i = 0; i < faces.length; i++) {
            if (!checkIn(i)) {
                var face_set = {
                    vertices: {},
                    faces: {}
                }
                var face = faces[i];
                face_set.faces[i] = face;
                face_set.vertices[face.a] = face.a;
                face_set.vertices[face.b] = face.b;
                face_set.vertices[face.c] = face.c;
                face_sets.push(face_set);
            }
        }



        if (face_sets.length > 1) {
            var geometries = [];
            for (var i = 0; i < face_sets.length; i++) {
                var _geometry = createGeometry(face_sets[i]);
                geometries.push(_geometry)
            }
            return geometries
        }

        return geometry;


        function checkIn(i_face) {
            var face = faces[i_face];
            var b_find = false;
            if (face_sets.length < 1) {
                b_find = false;
            }

            var find_i = 0;

            for (var i = face_sets.length - 1; i >= 0; i--) {
                var face_set = face_sets[i];
                if (face_set.vertices[face.a] == undefined && face_set.vertices[face.b] == undefined && face_set.vertices[face.c] == undefined) {
                    //b_find = false;
                } else {
                    if (b_find) {
                        mergeSet(face_set, face_sets[find_i]);

                        face_sets.splice(find_i, 1);
                    }
                    b_find = true;
                    find_i = i;
                    face_set.faces[i_face] = face;
                    face_set.vertices[face.a] = face.a;
                    face_set.vertices[face.b] = face.b;
                    face_set.vertices[face.c] = face.c;
                }
            }

            return b_find;

        }

        function mergeSet(face_set1, face_set2) {
            for (var p in face_set2.faces) {
                face_set1.faces[p] = face_set2.faces[p];
            }

            for (var p in face_set2.vertices) {
                face_set1.vertices[p] = face_set2.vertices[p];
            }
        }

        function createGeometry(face_set) {

            var _geometry = new Export.Geometry();
            var v_indexs = {};
            for (var i = 0; i < face_set.face; i++) {
                v_indexs[face.a] = face.a;
                v_indexs[face.b] = face.b;
                v_indexs[face.c] = face.c;
            }

            for (var index in v_indexs) {
                var v = geometry.vertices[index];
                v_indexs[index] = _geometry.vertices.length;
                _geometry.vertices.push(v);
            }

            for (var i = 0; i < face_set.face; i++) {
                var face = new Face3(v_indexs[face_set.face.a], v_indexs[face_set.face.b], v_indexs[face_set.face.c]);
                _geometry.faces.push(face)

            }

            return _geometry;


        }

    };

    Export.GeometryUtils = GeometryUtils;
}(window.THREE || (window.THREE = {})));