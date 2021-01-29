import * as jsonData from "../mocks/alerts/alerts.json";

export const findAll = async () => {
    console.log("en service");
    return jsonData[0]
}
