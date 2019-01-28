import dtime from "time-formater"; //日期格式化
import BaseComponent from "../prototype/baseComponent";
import StatisModel from "../models/statis/statis";


class Statistic extends BaseComponent {
    constructor() {
        super();
        this.apiRecord = this.apiRecord.bind(this);
    }
    async apiRecord(req, res, next) {
        try{
            const user_id = await this.getId("user_id");

            const apiInfo = {
                date: dtime().format("YYYY-MM-DD"), //日期格式化
                origin: req.headers.origin,
                id: user_id
            };
            StatisModel.create( apiInfo );
        } catch(err) {
            console.log('API数据出错',err);
        }
        next()
    }
}