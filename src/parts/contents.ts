import { Func } from "../core/func";
import { MousePointer } from "../core/mousePointer";
import { MyDisplay } from "../core/myDisplay";
import { Tween } from "../core/tween";
import { Point } from "../libs/point";
import { Util } from "../libs/util";
import { Item } from "./item";

// -----------------------------------------
//
// -----------------------------------------
export class Contents extends MyDisplay {

  private _item: Array<Item> = []

  constructor(opt:any) {
    super(opt)

    const num = Func.val(3, 5)
    for(let i = 0; i < num; i++) {
      const el = document.createElement('div')
      el.classList.add('js-item')
      this.el.append(el)

      this._item.push(new Item({
        el: el,
        id: i
      }))
    }

    this._resize()
  }

  protected _update(): void {
    super._update();

    const sw = Func.sw()
    const sh = Func.sh()

    const mx = MousePointer.instance.x
    const my = MousePointer.instance.y

    const area = sw * 0.9
    const center = new Point(sw * 0.5, sh * 0.5)
    const itemSize = (area / this._item.length) * 1

    this._item.forEach((item, i) => {
      item.setEmojiSize(itemSize)
      const itemX = itemSize * i + sw * 0.5 - (itemSize * this._item.length) * 0.5 + itemSize * 0.25
      const itemY = center.y - item.size.height * 0.5
      Tween.set(item.el, {
        x: itemX,
        y: itemY,
        width: item.size.width,
        height: item.size.height,
      })

      item.effecVal = Func.val(0, Util.map(Util.distance(mx, my, itemX + itemSize * 0.25, itemY + itemSize * 0.5), 1, 0, itemSize * 0.25, itemSize * 1))
    })
  }
}