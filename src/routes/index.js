import { RandomWalk } from 'routes/RandomWalk'
import { Election2d } from 'routes/Election2d'
import { Election3d } from 'routes/Election3d'
import { MusicRegression } from 'routes/MusicRegression'
import { HelloWorld } from 'routes/HelloWorld'
import { HelloWorldData } from 'routes/HelloWorldData'
import { HelloWorldData3d } from 'routes/HelloWorldData3d'
import { HelloWorldDataRegression } from 'routes/HelloWorldDataRegression'
import { LogisticMap } from 'routes/LogisticMap'
// import { LookAroundYou } from 'routes/LookAroundYou'

const routes = [
  {
    path: '/random-walk',
    route: 'Multidimensional random walk',
    component: RandomWalk,
    description: 'Random walk distance frequency correlation on multidimensional space',
    routeInfo: [
      'In this 1-5 random walks are simulated, happening in n-dimension spaces where movement can only following manatthan distance rules.',
      'Each walk is run 100 times over 10000 steps, then the distribution of distances is plotted.',
      'Also, some other statistical values are calculated.',
    ],
  },
  {
    path: '/election-2d',
    route: 'Election PCA2d',
    component: Election2d,
    description:
      'Election data plotted from n-dimensionality(where n is party number) to 2. Color represents distance from total.',
    routeInfo: [
      'Euclidean distance between every major city in Italy and total italian results during an election (camera 1979?)',
      'On click, cities are plotted on a 2d scatterplot using the 2 Principal components.',
    ],
  },
  {
    path: '/election-3d',
    route: 'Election PCA3d',
    component: Election3d,
    description:
      'Election data plotted from n-dimensionality(where n is party number) to 3. Color represents distance from total.',
    routeInfo: [
      'Euclidean distance between every major city in Italy and total italian results during an election (camera 1979?)',
      'On click, cities are plotted on a 3d scatterplot using the 3 Principal components.',
    ],
  },
  {
    path: '/music-regression',
    route: 'Music Regression',
    component: MusicRegression,
    description: 'Using regression to play notes.',
    routeInfo: ['Creates a simple polynomial regression from the notes added and plays it.'],
  },
  {
    path: '/hello-world',
    route: 'Hello World',
    component: HelloWorld,
    description: 'Hello world genetic generator',
    routeInfo: [
      'With the possibility to change some settings, uses a genetic algorithm to try to reach the goal string.',
      'Starts from n `seeds` of random strings long as the goal, then classifies the population using levenshtein distance from the goal.',
      'The best m `survivalRate` strings survive, and each one is coupled with the farthest(levenshtein) one between the survived ones.',
      'The farthest is chosen because it seems logical that far strings can have different correct characters (almost hybrid vigor).',
      'Those best are coupled until a new generation of the same size of the previous is created, and this loop is iterated until there is no more change in the best distance for the last `convergedLimit` times.',
    ],
  },
  {
    path: '/hello-world-data',
    route: 'Hello World Data',
    component: HelloWorldData,
    description: 'Hello world genetic generator data from ~10000 iterations',
    routeInfo: [
      'After 10000 iterations of Hello world, the data is analyzed and for each couple of independent variables the average values of all dependent values is calculated.',
      'The results is plotted on a 2d heatmap that shows one dependent value.',
    ],
  },
  {
    path: '/hello-world-data-3d',
    route: 'Hello World Data 3d',
    component: HelloWorldData3d,
    description: 'Hello world genetic generator data from ~10000 iterations - IN 3D!',
    routeInfo: [
      'After 10000 iterations of Hello world, the data is analyzed and for each triplet of independent variables the average values of all dependent values is calculated.',
      'The results is plotted on a 3d matrix that shows 2 dependent variables, one using the size of the cubes and one the color.',
    ],
  },
  {
    path: '/hello-world-data-regression',
    route: 'Hello World Data Regression',
    component: HelloWorldDataRegression,
    description:
      'Hello world genetic generator data from ~10000 iterations, multivariate polynomial regression!',
    routeInfo: [
      'A multivariate polynomial regression(degree = 3) is run over the data from hello world to create a model that can predict each new simulation.',
      'The predicted value is shown in a much more detailed heatmap, less precise.',
    ],
  },
  {
    path: '/logistic-map',
    route: 'Logistic Map',
    component: LogisticMap,
    description: 'A Logistic Map evolution visualization',
    routeInfo: [''],
  },
  {
    path: 'http://lookaroundyou.grokked.it',
    route: 'Look Around You',
    external: true,
    // component: LookAroundYou,
    description:
      'Look at what your friends are doing in your LAN (separate domain since it needs http)',
    // routeInfo: ['Looks in the local network if any host is serving anything on `0.0.0.0:8000`!'],
  },
]

export { routes }
