#!/bin/bash
ne=$1
outdir=$2
m=$3
mkdir -p $outdir/{110m,50m,10m}

if test -z "$m" || (echo "$m" | grep -E '(^|,)110m(,|$)' > /dev/null); then
  id_file=$(mktemp)
  shp2json $ne/110m_physical/ne_110m_land.shp \
    | geojson-to-georender -t natural=other -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/110m
  shp2json $ne/110m_physical/ne_110m_rivers_lake_centerlines.shp \
    | geojson-to-georender -t natural=water -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/110m
  shp2json $ne/110m_physical/ne_110m_lakes.shp \
    | geojson-to-georender -t natural=water -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/110m
  shp2json $ne/110m_physical/ne_110m_glaciated_areas.shp \
    | geojson-to-georender -t natural=glacier -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/110m
  shp2json $ne/110m_cultural/ne_110m_populated_places.shp \
    | geojson-to-georender -t place=city -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/110m
fi

if test -z "$m" || (echo "$m" | grep -E '(^|,)50m(,|$)' > /dev/null); then
  id_file=$(mktemp)
  shp2json $ne/50m_physical/ne_50m_land.shp \
    | geojson-to-georender -t natural=other -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:1 \
    | georender-eyros -d $outdir/50m
  shp2json $ne/50m_physical/ne_50m_rivers_lake_centerlines.shp \
    | geojson-to-georender -t natural=water -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/50m
  shp2json $ne/50m_physical/ne_50m_lakes.shp \
    | geojson-to-georender -t natural=water -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/50m
  shp2json $ne/50m_physical/ne_50m_glaciated_areas.shp \
    | geojson-to-georender -t natural=glacier -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/50m
  shp2json $ne/50m_physical/ne_50m_playas.shp \
    | geojson-to-georender -t natural=beach -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/50m
  shp2json $ne/50m_physical/ne_50m_antarctic_ice_shelves_polys.shp \
    | geojson-to-georender -t natural=glacier -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/50m
  shp2json $ne/50m_cultural/ne_50m_urban_areas.shp \
    | geojson-to-georender -t place=city -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/50m
  shp2json $ne/50m_cultural/ne_50m_populated_places.shp \
    | geojson-to-georender -t place=city -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/50m
fi

if test -z "$m" || (echo "$m" | grep -E '(^|,)10m(,|$)' > /dev/null); then
  shp2json $ne/10m_physical/ne_10m_land.shp \
    | geojson-to-georender -t natural=other -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:1 \
    | georender-eyros -d $outdir/10m
  shp2json $ne/10m_physical/ne_10m_rivers_lake_centerlines.shp \
    | geojson-to-georender -t natural=water -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/10m
  shp2json $ne/10m_physical/ne_10m_lakes.shp \
    | geojson-to-georender -t natural=water -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/10m
  shp2json $ne/10m_physical/ne_10m_glaciated_areas.shp \
    | geojson-to-georender -t natural=glacier -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/10m
  shp2json $ne/10m_physical/ne_10m_playas.shp \
    | geojson-to-georender -t natural=beach -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/10m
  shp2json $ne/10m_physical/ne_10m_antarctic_ice_shelves_polys.shp \
    | geojson-to-georender -t natural=glacier -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/10m
  shp2json $ne/10m_cultural/ne_10m_urban_areas.shp \
    | geojson-to-georender -t place=city -r ./lib/labels.js --ra $id_file \
    | georender-clip --divide icosphere:0 \
    | georender-eyros -d $outdir/10m
  shp2json $ne/10m_cultural/ne_10m_populated_places.shp \
    | geojson-to-georender -t place=city -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/10m
  #shp2json $ne/10m_cultural/ne_10m_parks_and_protected_lands_area.shp \
  #  | geojson-to-georender -t boundary=protected_area -r ./lib/labels.js --ra $id_file \
  #  | georender-eyros -d $outdir/10m
  shp2json $ne/10m_cultural/ne_10m_roads.shp \
    | geojson-to-georender -t highway=other -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/10m
  shp2json $ne/10m_cultural/ne_10m_railroads.shp \
    | geojson-to-georender -t railway=rail -r ./lib/labels.js --ra $id_file \
    | georender-eyros -d $outdir/10m
fi
