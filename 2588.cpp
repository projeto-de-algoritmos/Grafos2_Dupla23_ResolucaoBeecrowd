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

int sujeira, movimentos, coluna, linha;
pair<int, int> inicio, fim;
char caminho[WHMAX][WHMAX];
bool visited[WHMAX][WHMAX];

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
    cout<<inicio.first<<' '<<inicio.second<<' '<<fim.first<<' '<<fim.second<<END;
	}
	return 0;
}
