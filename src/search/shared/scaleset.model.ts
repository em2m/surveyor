export class ScalesetRestQuery {
  aggs: any[] = [];
  bbox: any; // TODO: ADD SUPPORT FOR JTS ENVELOPE
  constraints: Array<ScalesetConstraint> = [];
  fields: Array<Field> = [];
  geoField: string;
  limit = 10;
  offset = 0;
  q: string;
  sorts: Array<ScalesetSort> = [];

  constructor() {
  }
}

export class ScalesetQuery {
  aggs: { [ key: string ]: ScalesetAggregation; } = {};
  bbox: any; // TODO: ADD SUPPORT FOR JTS ENVELOPE
  filters: { [ key: string ]: ScalesetFilter; } = {};
  fields: Array<Field> = [];
  fieldSet: string;
  geoField: string;
  limit = 10;
  offset = 0;
  headers: { [ key: string ]: any; } = {};
  q: string;
  sorts: Array<ScalesetSort> = [];

  constructor() {
  }
}

export class Field {
  name?: string;
  label?: string;
  expr?: string;
  settings?: { [ key: string ]: any; } = {};

  constructor() {
  }
}

export class ScalesetConstraint {
  field: string;
  values: Array<string>;
}

export class ScalesetFilter {
  name: string;
  type: string;
  clause = 'MUST';     // MUST, MUST_NOT, SHOULD

  constructor() {
  }
}

export class ScalesetTermFilter extends ScalesetFilter {
  query: string;
  field: string;
  type = "term";

  constructor() {
    super();
  }
}

export class ScalesetQueryFilter extends ScalesetFilter {
  query: string;
  operator = 'AND';
  type = "query";

  constructor() {
    super();
  }
}

export class ScalesetRangeFilter extends ScalesetFilter {
  type = "range";
  field: string;
  gte: string;
  gt: string;
  lte: string;
  lt: string;
  time_zone: string;

  constructor() {
    super();
  }
}

export class ScalesetAggregation {
  name: string;
  type: string;
  field: string;
  order: ScalesetSort;
  limit: number;
  time_zone: string;
  aggs: { [ key: string ]: ScalesetAggregation; } = {};

  constructor() {
  }
}

export class ScalesetSort {
  field: string;
  direction: string;          // Ascending, Descending
  type = 'Lexical';   // Count, Lexical, None

  constructor(field?: string, direction: string = "Descending") {
    this.field = field;
    this.direction = direction;
  }
}

export class ScalesetResults {
  aggs: { [ key: string ]: ScalesetAggregationResults; } = {};
  items: Array<any> = [];
  query: ScalesetQuery;
  totalItems = 0;
  bbox: any; // TODO: ADD SUPPORT FOR JTS ENVELOPE
  headers: { [ key: string ]: any; } = {};
  fields: Array<string> = [];

  constructor() {
  }
}

export class ScalesetAggregationResults {
  buckets: Array<ScalesetBucket> = [];
  stats: ScalesetStats;
  name: string;

  constructor() {
  }
}

export class ScalesetBucket {
  count: number;
  label: string;
  key: any;
  stats: ScalesetStats;
  aggs: { [ key: string ]: ScalesetAggregationResults; } = {};

  constructor() {
  }
}

export class ScalesetStats {
  count: number;
  sum: number;
  min: number;
  sumOfSquares: number;
  variance: number;
  stdDeviation: number;

  constructor() {
  }
}
