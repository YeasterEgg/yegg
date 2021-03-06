const levDist = require('fast-levenshtein')
const statCalc = require('stats-lite')
const { sortBy, map, uniq } = require('lodash')
const { lower } = require('alphabet')
const POINT_RADIUS = 5

export const CHARACTER_SET = [...lower, ' ']
const randomLetter = () => CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)]
const randomString = length => () => Array.from({ length }, randomLetter).join('')

export class GeneticGenerator {
  constructor({ seedNumber, survivalRate, mutationRate, goal, convergedLimit, canvases }) {
    this.seedNumber = seedNumber
    this.mutationRate = mutationRate
    this.survivalRate = survivalRate
    this.goal = goal
    this.convergedLimit = convergedLimit
    this.canvases = canvases
    this.currentGeneration = this.generateSeeds()
  }

  coupler = group => {
    const bestCouples = group.map(first => {
      const furthest = group.reduce((acc, second) => {
        const dist = levDist.get(first.string, second.string)
        return dist > acc.dist
          ? { ...second, dist }
          : acc
      }, { ...first, dist: 0 })
      return [first, furthest]
    })
    return bestCouples
  }

  generateSeeds = () => {
    const strings = Array.from({ length: this.seedNumber }, randomString(this.goal.length))
    const seeds = strings.map(string => {
      const dist = levDist.get(this.goal, string)
      return { string, dist }
    })
    return sortBy(seeds, 'dist')
  }

  generateNewLineage = () => {
    const best = this.currentGeneration.slice(0, Math.round(this.survivalRate * this.currentGeneration.length))
    const remaining = this.currentGeneration.length - best.length
    const coupled = this.coupler(best)
    const generated = Array.from({ length: remaining }, (_, idx) => {
      const couple = coupled[idx % coupled.length]
      const letters = Array.from({ length: this.goal.length }, (__, jdx) => {
        const mutation = Math.random() <= this.mutationRate
        if (mutation) return randomLetter()
        const parent = couple[Math.round(Math.random())]
        return parent.string[jdx]
      })
      const string = letters.join('')
      const dist = levDist.get(this.goal, string)
      return { string, dist }
    })
    const newGeneration = [ ...generated, ...best ]
    this.currentGeneration = sortBy(newGeneration, 'dist')
  }

  checkIfOver = () => {
    if (this.allGenerations.length < this.convergedLimit) return false
    const allLastBests = map(this.allGenerations.slice(-this.convergedLimit), l => l[0].dist)
    return uniq(allLastBests).length === 1
  }

  getStats = () => {
    const lastDistance = map(this.allGenerations.slice(-1)[0], 'dist')
    return [
      { name: 'iterations', value: this.allGenerations.length },
      { name: 'mean', value: statCalc.mean(lastDistance) },
      { name: 'median', value: statCalc.median(lastDistance) },
      { name: 'mode', value: statCalc.mode(lastDistance) },
      { name: 'stdev', value: statCalc.stdev(lastDistance) },
      { name: 'best', value: this.currentGeneration[0].string },
    ]
  }

  plotIterations = () => {
    const { canvases: { mean, best } } = this
    const { width, height } = mean.canvas
    mean.ctx.clearRect(0, 0, width, height)
    best.ctx.clearRect(0, 0, width, height)
    const actualWidth = width - POINT_RADIUS * 2
    const actualHeight = height - POINT_RADIUS * 2
    const columnWidth = actualWidth / this.allGenerations.length
    const columnHeightUnit = actualHeight / this.goal.length
    for (let i = 0; i < this.allGenerations.length; i++) {
      const generation = this.allGenerations[i]
      const generationDist = map(generation, 'dist')
      const meanDist = statCalc.mean(generationDist)
      const bestDist = generationDist[0]
      const xMean = POINT_RADIUS + columnWidth * i
      const yMean = height - (POINT_RADIUS + columnHeightUnit * meanDist)
      const xBest = POINT_RADIUS + columnWidth * i
      const yBest = height - (POINT_RADIUS + columnHeightUnit * bestDist)
      mean.ctx.beginPath()
      mean.ctx.arc(xMean, yMean, POINT_RADIUS, 0, 2 * Math.PI)
      mean.ctx.stroke()
      best.ctx.beginPath()
      best.ctx.arc(xBest, yBest, POINT_RADIUS, 0, 2 * Math.PI)
      best.ctx.stroke()
    }
  }

  runUntilConvergence = () => {
    this.allGenerations = [this.currentGeneration]
    while (true) {
      this.generateNewLineage()
      this.allGenerations.push(this.currentGeneration)
      if (this.checkIfOver()) break
    }
    const stats = this.getStats()
    this.plotIterations()
    return { stats }
  }
}
