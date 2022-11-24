export default class Entry {
  constructor(data = {}) {
    this.id = data.id || undefined;
    this.date = data.date || null;
    this.meal = data.meal || '';
    this.name = data.name || '';
    this.servingSize = data.servingSize || '';
    this.numberOfServings = data.numberOfServings || 1;
    this.calories = data.calories || 0;
    this.fats = data.fats || 0;
    this.carbs = data.carbs || 0;
    this.proteins = data.proteins || 0;
    this.createdOn = data.createdOn || new Date();
    this.createdBy = data.createdBy || null;
    this.lastUpdatedOn = data.lastUpdatedOn || new Date();
    this.lastUpdatedBy = data.lastUpdatedBy || null;
    this.deletedOn = data.deletedOn || null;
    this.deletedBy = data.deletedBy || null;
    this.isActive = data.isActive || 1;
  }

  toJSON() {
    return {
      id: this.id,
      date: this.date,
      meal: this.meal,
      name: this.name,
      servingSize: this.servingSize,
      numberOfServings: this.numberOfServings,
      calories: this.calories,
      fats: this.fats,
      carbs: this.carbs,
      proteins: this.proteins,
      createdOn: this.createdOn,
      createdBy: this.createdBy,
      lastUpdatedOn: this.lastUpdatedOn,
      lastUpdatedBy: this.lastUpdatedBy,
      deletedOn: this.deletedOn,
      deletedBy: this.deletedBy,
      isActive: this.isActive,
    };
  }
}
