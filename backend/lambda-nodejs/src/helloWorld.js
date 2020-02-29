import moment from "moment";

const helloWorld = async (event) => {
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Welcome to Prolyzer on NodeJS. The time is ${moment().toISOString()}`
        })
    };
};

export default helloWorld;
