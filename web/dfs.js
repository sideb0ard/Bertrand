class Graph {

  constructor(v) {
    this.V = v;
    this.adj = new Array(v);
    for(let i = 0; i< v; i++) {
      this.adj[i] = [];
    }
  }

  addEdge(v, w) {
    this.adj[v].push(w);
  }

  DFSUtil(v, visited) {
    visited[v] = true;
    console.log(v + " ");
    for (let i of this.adj[v].values()) {
      if (!visited[i])
        this.DFSUtil(i, visited);
    }
  }

  DFS(v) {
    let visited = new Array(this.V);
    for (let i = 0; i < this.V; i++ )
      visited[i] = false;

    this.DFSUtil(v, visited);
  }
}
