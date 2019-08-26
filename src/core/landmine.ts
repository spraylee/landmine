import { createList, sleep, untilRender } from './utils'

const setting = {
  size: {
    currentIndex: 2,
    list: [
      { width: 10, height: 10, label: '10X10', landmineNumber: 10 },
      { width: 15, height: 15, label: '15X15', landmineNumber: 22 },
      { width: 20, height: 20, label: '20X20', landmineNumber: 40 }
    ],
    get current() {
      return setting.size.list[this.currentIndex]
    },
    change(index: number) {
      setting.size.currentIndex = index
      landmine.table = createTable(setting.size.current)
    }
  }
}

class Cell {
  private static table: Record<string, Cell> = {}
  static getCell(x: number, y: number) {
    return Cell.table[`${x}-${y}`]
  }
  private static digNextList: Cell[] = []
  private static gameOver() {
    Object.values(Cell.table).forEach(i => {
      if (i.isLandmine) {
        i.isBoom = i.isLandmine
      }
      // i.isOpen = true
      // i.isMarked = false
      // const neighborList = i.getNeighborEight()
      // i.number = neighborList.filter(j => j.isLandmine).length
    })
  }
  x = 0
  y = 0
  isOpen = false
  isMarked = false
  isBoom = false
  private isLandmine = false
  /**
   * -1: landmine, 0 , 1, 2, 3...
   */
  number = 0
  constructor(x: number, y: number, isLandmine: boolean) {
    this.x = x
    this.y = y
    this.isLandmine = isLandmine
    Cell.table[`${x}-${y}`] = this
  }
  async dig() {
    if (this.isOpen) throw 'is opened'
    if (this.isLandmine) {
      this.isBoom = true
      Cell.gameOver()
      await untilRender()
      landmine.isBoom = true
      // alert('boom!')
    }
    this.isBoom = this.isLandmine
    this.isOpen = true
    const neighborList = this.getNeighborEight()
    this.number = neighborList.filter(i => i.isLandmine).length
    if (this.number === 0) {
      Cell.digNextList.push(...this.getNeighborEight().filter(i => !i.isOpen && !Cell.digNextList.includes(i)))
    }
    const firstCellInNextList = Cell.digNextList.shift()
    if (firstCellInNextList) {
      await untilRender()
      firstCellInNextList.dig()
    } else {
      const allCell = Object.values(Cell.table)
      if (allCell.filter(i => !i.isOpen).length === landmine.size.landmineNumber) {
        await untilRender()
        alert('win')
      }
    }
  }
  getNeighborEight() {
    const offsetList = [[0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1]]
    return offsetList.map(([offsetX, offsetY]) => Cell.getCell(this.x + offsetX, this.y + offsetY)).filter(i => i)
  }

  toggleMark() {
    this.isMarked = !this.isMarked
  }
}

function createTable({ width, height, landmineNumber }: { width: number; height: number; landmineNumber: number }) {
  const landmineList = createList(width * height, i => i < landmineNumber).sort(() => (Math.random() > 0.5 ? 1 : -1))
  return createList(width, x => createList(height, y => new Cell(x, y, landmineList.pop() || false)))
}

const landmine = {
  size: setting.size.current,
  table: createTable(setting.size.current),
  isWin: false,
  isBoom: false,
  restart() {
    landmine.isWin = false
    landmine.isBoom = false
    landmine.table = createTable(setting.size.current)
  }
}

export { setting, landmine, Cell }
