export default function(id, src, tilesetWidth = 32, tilesetHeight = 32, tileZoom = 1, initialData = [[]]) {
    const mapObj = {
        //
        preload: scene => {
            scene.load.image(id + "_tiles", src);
        },
        create: (scene, data = initialData, mapProps = {}, layerProps, tilemapProps) => {
            const tileWidth  = tilesetWidth * tileZoom;
            const tileHeight = tilesetHeight  * tileZoom;

            mapObj.map = scene.make.tilemap({ data, tileWidth, tileHeight });
            mapObj.map.properties = mapProps;
            mapObj.mainTilemap = mapObj.addTileset(id + "_tiles", tilemapProps);
            mapObj.mainLayer = mapObj.addLayer(mapObj.mainTilemap, layerProps);

            return mapObj.map
        },

        //
        addTileset: (tilemapId, layerProps = {}) => {
            const layerId = "layer_" + mapObj.map.tilesets.length;
            const layer = mapObj.map.addTilesetImage(layerId, tilemapId, tilesetWidth, tilesetHeight, 2, 2);
            layer.properties = layerProps;
            return layer;
        },
        addLayer: (tilemap = mapObj.mainTilemap, tilemapProps = {}) => {
            const layer = mapObj.map.createStaticLayer(mapObj.map.layers.length - 1, tilemap, 0, 0);
            if (!layer) {
                return layer
            }

            layer.properties = tilemapProps;
            return layer;
        }
    };

    return mapObj;
}