'use strict';
import mongoose from "mongoose";
// 在创建表之前我们需要跟大家说一下mongoDB的数据类型，具体数据类型如下：
//
// 字符串 - 这是用于存储数据的最常用的数据类型。MongoDB中的字符串必须为UTF-8。
// 整型 - 此类型用于存储数值。 整数可以是32位或64位，具体取决于服务器。
// 布尔类型 - 此类型用于存储布尔值(true / false)值。
// 双精度浮点数 - 此类型用于存储浮点值。
// 最小/最大键 - 此类型用于将值与最小和最大BSON元素进行比较。
// 数组 - 此类型用于将数组或列表或多个值存储到一个键中。
// 时间戳 - ctimestamp，当文档被修改或添加时，可以方便地进行录制。
// 对象 - 此数据类型用于嵌入式文档。
// 对象 - 此数据类型用于嵌入式文档。
// Null - 此类型用于存储Null值。
// 符号 - 该数据类型与字符串相同; 但是，通常保留用于使用特定符号类型的语言。
// 日期 - 此数据类型用于以UNIX时间格式存储当前日期或时间。您可以通过创建日期对象并将日，月，年的日期进行指定自己需要的日期时间。
// 对象ID - 此数据类型用于存储文档的ID。
// 二进制数据 - 此数据类型用于存储二进制数据。
// 代码 - 此数据类型用于将JavaScript代码存储到文档中。
// 正则表达式 - 此数据类型用于存储正则表达式。

/*
*   创建表
* */
const idsSchema = new mongoose.Schema({
    user_id : Number
});

const Ids = mongoose.model("Ids" , idsSchema );

Ids.findOne((err,data) => {
    if( !data ) {
        const newIds  = new Ids({
            user_id : Number
        })
        newIds.save();
    }
});

export default Ids;