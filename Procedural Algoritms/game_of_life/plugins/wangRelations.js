// Top Right
function topRightCorrelations({
    topLeft,
    topCenter,
    topRight,
    left,
    center,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
}) {
    const correlations = {}
    correlations[topRight] = {}

    correlations[topRight][topLeft] = topCenter
    correlations[topRight][topCenter] = topCenter
    correlations[topRight][topRight] = topRight
    correlations[topRight][left] = center 
    correlations[topRight][center] = center
    correlations[topRight][right] = right
    correlations[topRight][bottomLeft] = center
    correlations[topRight][bottomCenter] = center
    correlations[topRight][bottomRight] = right

    return correlations
}

// Bottom Right
function bottomRightCorrelations({
    topLeft,
    topCenter,
    topRight,
    left,
    center,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
}) {
    const correlations = {}
    correlations[bottomRight] = {}

    correlations[bottomRight][topLeft] = topCenter
    correlations[bottomRight][topCenter] = topCenter
    correlations[bottomRight][topRight] = topRight
    correlations[bottomRight][left] = center 
    correlations[bottomRight][center] = center
    correlations[bottomRight][right] = right
    correlations[bottomRight][bottomLeft] = bottomCenter
    correlations[bottomRight][bottomCenter] = bottomCenter
    correlations[bottomRight][bottomRight] = bottomRight

    return correlations
}

// Bottom Left
function bottomLeftCorrelations({
    topLeft,
    topCenter,
    topRight,
    left,
    center,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
}) {
    const correlations = {}
    correlations[bottomLeft] = {}

    correlations[bottomLeft][topLeft] = topLeft
    correlations[bottomLeft][topCenter] = topCenter
    correlations[bottomLeft][topRight] = topCenter
    correlations[bottomLeft][left] = left 
    correlations[bottomLeft][center] = center
    correlations[bottomLeft][right] = center
    correlations[bottomLeft][bottomLeft] = bottomLeft
    correlations[bottomLeft][bottomCenter] = bottomCenter
    correlations[bottomLeft][bottomRight] = bottomCenter

    return correlations
}

// Top Left
function topLeftCorrelations({
    topLeft,
    topCenter,
    topRight,
    left,
    center,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
}) {
    const correlations = {}
    correlations[topLeft] = {}

    correlations[topLeft][topLeft] = topLeft
    correlations[topLeft][topCenter] = topCenter
    correlations[topLeft][topRight] = topCenter
    correlations[topLeft][left] = left 
    correlations[topLeft][center] = center
    correlations[topLeft][right] = center
    correlations[topLeft][bottomLeft] = left
    correlations[topLeft][bottomCenter] = center
    correlations[topLeft][bottomRight] = center

    return correlations
}


// Top Center
function topCenterCorrelations({
    topLeft,
    topCenter,
    topRight,
    left,
    center,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
}) {
    const correlations = {}
    correlations[topCenter] = {}

    correlations[topCenter][topLeft] = topCenter
    correlations[topCenter][topCenter] = topCenter
    correlations[topCenter][topRight] = topCenter
    correlations[topCenter][left] = center 
    correlations[topCenter][center] = center
    correlations[topCenter][right] = center
    correlations[topCenter][bottomLeft] = center
    correlations[topCenter][bottomCenter] = center
    correlations[topCenter][bottomRight] = center

    return correlations
}

// Right Center
function rightCenterCorrelations({
    topLeft,
    topCenter,
    topRight,
    left,
    center,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
}) {
    const correlations = {}
    correlations[right] = {}

    correlations[right][topLeft] = center
    correlations[right][topCenter] = center
    correlations[right][topRight] = right
    correlations[right][left] = center 
    correlations[right][center] = center
    correlations[right][right] = right
    correlations[right][bottomLeft] = center
    correlations[right][bottomCenter] = center
    correlations[right][bottomRight] = right

    return correlations
}

// Bottom Center
function bottomCenterCorrelations({
    topLeft,
    topCenter,
    topRight,
    left,
    center,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
}) {
    const correlations = {}
    correlations[bottomCenter] = {}

    correlations[bottomCenter][topLeft] = topLeft
    correlations[bottomCenter][topCenter] = topCenter
    correlations[bottomCenter][topRight] = topRight
    correlations[bottomCenter][left] = center 
    correlations[bottomCenter][center] = center
    correlations[bottomCenter][right] = center
    correlations[bottomCenter][bottomLeft] = bottomCenter
    correlations[bottomCenter][bottomCenter] = bottomCenter
    correlations[bottomCenter][bottomRight] = bottomCenter

    return correlations
}

// Left Center
function leftCenterCorrelations({
    topLeft,
    topCenter,
    topRight,
    left,
    center,
    right,
    bottomLeft,
    bottomCenter,
    bottomRight
}) {
    const correlations = {}
    correlations[left] = {}

    correlations[left][topLeft] = left
    correlations[left][topCenter] = center
    correlations[left][topRight] = center
    correlations[left][left] = left 
    correlations[left][center] = center
    correlations[left][right] = center
    correlations[left][bottomLeft] = left
    correlations[left][bottomCenter] = center
    correlations[left][bottomRight] = center

    return correlations
}


export default function computeWangTilesRelations(wangCorrelations) {
    return Object.assign(
        // corners
        topRightCorrelations(wangCorrelations),
        bottomRightCorrelations(wangCorrelations),
        bottomLeftCorrelations(wangCorrelations),
        topLeftCorrelations(wangCorrelations),

        // directional cross
        topCenterCorrelations(wangCorrelations),
        rightCenterCorrelations(wangCorrelations),
        bottomCenterCorrelations(wangCorrelations),
        leftCenterCorrelations(wangCorrelations)
    );   
}