function main(graph) {
    const neighborNodes = new Map();
    const lines = new Map();

    // 그래프의 각 노드에 `이웃 노드` 맵과 `라인` 맵을 업데이트
    for (let [node1, node2] of graph) {
        if (!neighborNodes.has(node1)) neighborNodes.set(node1, []);
        if (!neighborNodes.has(node2)) neighborNodes.set(node2, []);
        neighborNodes.get(node1).push(node2);
        neighborNodes.get(node2).push(node1);

        lines.set(node1, (lines.get(node1) || 0) + 1);
        lines.set(node2, (lines.get(node2) || 0) + 1);
    }

    // 홀수의 라인을 가진 노드를 추적하기 위한 배열
    let oddLineNodes = [];
    for (let [node, line] of lines) {
        if (line % 2 != 0) oddLineNodes.push(node);
    }

    // 홀수의 라인을 가진 노드가 없거나 2개 이하인 경우에만 코드가 진행
    if (oddLineNodes.length != 0 && oddLineNodes.length != 2) {
        return null;
    }

    // 시작 노드 결정
    let startNode = oddLineNodes.length > 0 ? oddLineNodes[0] : graph[0][0];
    let path = [];

    dfs(startNode, neighborNodes, path);

    return path.reverse();
}

function dfs(startNode, neighborNodes, path) {
    // 현재 노드의 이웃들을 반복하면서 DFS 실행
    for (let neighbors = neighborNodes.get(startNode); neighbors && neighbors.length > 0;) {
        let next = neighbors.pop();
        // 이웃의 엣지 제거
        neighborNodes.get(next).splice(neighborNodes.get(next).indexOf(startNode), 1);
        // 재귀적으로 DFS 호출
        dfs(next, neighborNodes, path);
    }
    path.push(startNode); // 현재 노드를 경로에 추가
}
