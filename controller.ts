import { GlossaryItem, GlossaryListItem } from "./interfaces.ts";

export class Controller {
  public dataJson: Array<GlossaryItem>;

  constructor(dataJson: Array<GlossaryItem>) {
    this.dataJson = dataJson;
  }

  private getDataClone(): Array<GlossaryItem> {
    return JSON.parse(JSON.stringify(this.dataJson));
  }

  public parseGlossaryListParams(params: {
    [key: string]: string;
  }): { [key: string]: number | string } {
    let allKeys: Array<string> = Object.keys(params);
    const updatedParams: { [key: string]: number | string } = {};
    for (let index in allKeys) {
      let key: string = allKeys[index];
      if (key === "from" || key === "size") {
        updatedParams[key] = parseInt(params[key]);
      } else {
        updatedParams[key] = params[key];
      }
    }
    return updatedParams;
  }

  public getGlossaryList(params: any): Array<GlossaryListItem> {
    let glossaryItems = this.getDataClone();

    if (params.search) {
      glossaryItems = glossaryItems.filter(
        (glossaryItem: GlossaryItem) =>
          glossaryItem.title
            .toLowerCase()
            .search(params.search.toLowerCase()) >= 0
      );
    }

    if (params.category) {
      glossaryItems = glossaryItems.filter((glossaryItem: GlossaryItem) =>
        glossaryItem.categories.includes(params.category)
      );
    }

    let startIndex: number = 0;
    if (params.from >= 0) {
      startIndex = params.from;
    }
    let fetchSize: number = 10;
    if (params.size > 0) {
      fetchSize = params.size;
    } else {
      fetchSize = glossaryItems.length;
    }

    let responseList: Array<GlossaryItem> = [];
    let maxIndex = startIndex + fetchSize;
    for (let i = startIndex; i < maxIndex; i++) {
      if (glossaryItems[i]) {
        responseList.push(glossaryItems[i]);
      }
    }
    return responseList.map(
      (listItem: GlossaryItem): GlossaryListItem => ({
        id: listItem.id,
        title: listItem.title,
      })
    );
  }

  public sortGlossaryList(
    glossaryItems: Array<GlossaryListItem>
  ): Array<GlossaryListItem> {
    return glossaryItems.sort(
      (first: GlossaryListItem, second: GlossaryListItem): number => {
        if (first.title === second.title) return 0;
        else if (first.title > second.title) return 1;
        else return -1;
      }
    );
  }

  public parseGetGlossaryItemParam(params: {
    contentId: string;
  }): { contentId: number } {
    return { contentId: parseInt(params.contentId) };
  }

  public getGlossaryItem(params: { contentId: number }): GlossaryItem | object {
    let contentId: number = 1;
    if (params.contentId) {
      contentId = params.contentId;
    }

    let getGlossaryDocument = this.dataJson.find(
      (data) => data.id == contentId
    );

    if (getGlossaryDocument) {
      return getGlossaryDocument;
    } else {
      return {};
    }
  }

  public getAllGlossaryItems(params: any): Array<GlossaryListItem> {
    let glossaryItems = this.getDataClone();

    if (params.search) {
      glossaryItems = glossaryItems.filter(
        (glossaryItem: GlossaryItem) =>
          glossaryItem.title
            .toLowerCase()
            .search(params.search.toLowerCase()) >= 0
      );
    }
    return glossaryItems;
  }
}
