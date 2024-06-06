// From example: https://www.chartjs.org/docs/latest/getting-started/usage.html
import cubejs, { CubeApi } from "@cubejs-client/core";

const apiUrl: string =
  "https://heavy-lansford.gcp-us-central1.cubecloudapp.dev/cubejs-api/v1";
const cubeToken: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjEwMDAwMDAwMDAsImV4cCI6NTAwMDAwMDAwMH0.OHZOpOBVKr-sCwn8sbZ5UFsqI3uCs6e4omT7P6WVMFw";

const cubeApi: CubeApi = cubejs(cubeToken, { apiUrl });

export async function getAquisitionsByYear() {
  const acquisitionsByYearQuery: any = {
    dimensions: ["Artworks.yearAcquired"],
    measures: ["Artworks.count"],
    filters: [
      {
        member: "Artworks.yearAcquired",
        operator: "set",
      },
    ],
    order: {
      "Artworks.yearAcquired": "asc",
    },
  };

  const resultSet = await cubeApi.load(acquisitionsByYearQuery);

  return resultSet.tablePivot().map((row) => ({
    year: parseInt(row["Artworks.yearAcquired"] as string),
    count: parseInt(row["Artworks.count"] as string),
  }));
}

export async function getDimensions() {
  const dimensionsQuery: any = {
    dimensions: ["Artworks.widthCm", "Artworks.heightCm"],
    measures: ["Artworks.count"],
    filters: [
      {
        member: "Artworks.classification",
        operator: "equals",
        values: ["Painting"],
      },
      {
        member: "Artworks.widthCm",
        operator: "set",
      },
      {
        member: "Artworks.widthCm",
        operator: "lt",
        values: ["500"],
      },
      {
        member: "Artworks.heightCm",
        operator: "set",
      },
      {
        member: "Artworks.heightCm",
        operator: "lt",
        values: ["500"],
      },
    ],
  };

  const resultSet = await cubeApi.load(dimensionsQuery);

  return resultSet.tablePivot().map((row) => ({
    width: parseInt(row["Artworks.widthCm"] as string),
    height: parseInt(row["Artworks.heightCm"] as string),
    count: parseInt(row["Artworks.count"] as string),
  }));
}
