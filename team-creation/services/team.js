const query = require('../databaseconnection/connection.js');

postDetails = async (id, name, rating) => {
    try {
        const result = await query(`insert into users values($1,$2,$3)`, [id, name, rating]);
        if (result) {
            return result;
        } else {
            throw new Error('data not retreived');
        }
    } catch (error) {
        console.log('---exception---', error);
    }
}

makeTeams = async (size) => {
    try {
        arr = [];
        sum = [];
        const result = await query(`select * from users order by rating desc`);
        if (!result) {
            throw new Error('data not retreived');
        }
        for (var i = 0; i < size; i++) {
            arr[i] = [];
            sum[i] = 0;
        }
        var j = 0;
        for (var i = 0; i < result.rows.length; i++) {
            if (i < size) {
                await arr[j].push(result.rows[i]);
                sum[j] = sum[j] + parseInt(result["rows"][i]["rating"]);
                j++;
                continue;
            }

            let index = sum.indexOf(Math.min.apply(Math, sum));

            while (arr[index].length == (result.rows.length / size)) {
                sum.splice(index, 1);
                index = sum.indexOf(Math.min.apply(Math, sum));
            }

            arr[index].push(result.rows[i]);
            sum[index] = sum[index] + parseInt(result["rows"][i]["rating"]);
        }
        return arr;
    } catch (error) {
        console.log('---exception---', error)
    }
}

module.exports = {
    postDetails,
    makeTeams
}