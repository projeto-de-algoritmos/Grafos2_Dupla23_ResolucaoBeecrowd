#include <bits/stdc++.h>
using namespace std;

/**
 * N (1 ≤ N ≤ 8) e M (1 ≤ M ≤ 10^9). A segunda linha também contém dois inteiros W e H (5 ≤ W, H ≤ 100)
 * Obstáculos são representados por '#', posições livres por '.' , a posição inicial de Ricciardi por 'R', grãos de sujeira por '*' e a estação de recarga por 'S'.
 *
**/

#define WHMAX 101
#define OBSTACULO '#'
#define RICCIARDI 'R'
#define SUJEIRA '*'
#define ESTACAO 'S'
#define END '\n'

long long unsigned int movimentos;
int sujeira, coluna, linha;
pair<int, int> inicio, fim;
char caminho[WHMAX][WHMAX];
bool visited[WHMAX][WHMAX];

int next_position(pair<int, int> position, int point, int move) {
  if(caminho[position.first][position.second] == OBSTACULO) {
    return -1;
  }
  int distancia = abs(position.first-fim.first) + abs(position.second-fim.second);
  if(distancia > (movimentos-move)) {
    return -1;
  }
  if(caminho[position.first][position.second] == SUJEIRA) {
    ++point;
  }
  ++move;
  pair<int, int> moves[4]{
    make_pair(position.first-1, position.second),
    make_pair(position.first, position.second-1),
    make_pair(position.first+1, position.second),
    make_pair(position.first, position.second+1)
  };
  int higher{-1}, next{0};
  for(int i=0; i<4; i++) {
    if((moves[i].first >= 0)
    && (moves[i].first < linha)
    && (moves[i].second >= 0)
    && (moves[i].second < coluna)) {
      next=next_position(moves[i], point, move);
      if(higher < next) {
        higher=next;
      }
    }
  }
  if(caminho[position.first][position.second]==ESTACAO)
    return point;

  return higher;
}

int main() {
  int i, j;
	while(scanf("%d ", &sujeira) != EOF) {
		cin>>movimentos>>coluna>>linha;
		for(i=0; i<linha; i++) {
			for(j=0; j<coluna; j++) {
				cin >> caminho[i][j];
				if(caminho[i][j] == RICCIARDI) {
          inicio.first=i;
          inicio.second=j;
        }
				else if(caminho[i][j] == ESTACAO) {
          fim.first=i;
          fim.second=j;
        }
			}
		}
    //cout<<inicio.first<<' '<<inicio.second<<' '<<fim.first<<' '<<fim.second<<END;
    cout<<next_position(inicio,0,0)<<END;
	}
	return 0;
}
