const sql = require('mssql/msnodesqlv8');
const camelcaseObjectDeep = require('camelcase-object-deep');

const config = {
    database: 'NodeBillShare',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const addParticipant = async participant => {
    await sql.connect(config);

    await sql.query`INSERT INTO Participants (Name, Email) Values (${participant.name}, ${participant.email})`;

    await sql.close();
}

const getParticipants = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM Participants`;
    await sql.close();
    return recordset;
}

const addBill = async bill => {
    await sql.connect(config);
    const { recordset } = await sql.query`INSERT INTO Bills (Amount, Date) Values (${bill.amount}, ${new Date()}); SELECT SCOPE_IDENTITY() as id`;
    const billId = recordset[0].id;
    for(let participantId of bill.participantIds) {
        await sql.query`INSERT INTO BillParticipants (ParticipantId, BillId) VALUES (${participantId}, ${billId})`;
    }
    await sql.close();
}

const getBills = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT b.*, count(*) as 'ParticipantCount' FROM Bills b
    JOIN BillParticipants bp
    ON b.Id = bp.BillId
    GROUP BY b.Id, b.Date, b.Amount`;
    await sql.close();
    return recordset;
}

const getBill = async id => {
    await sql.connect(config);
    let { recordset: bill } = await sql.query`SELECT * FROM Bills WHERE Id = ${id}`;
    let {recordset: participants} = await sql.query`SELECT p.* FROM Participants p
    JOIN BillParticipants bp ON p.Id = bp.ParticipantId
    WHERE bp.BillId = ${id}`;
    bill = camelcaseObjectDeep(bill[0]);
    participants = camelcaseObjectDeep(participants);
    await sql.close();
    return {
        id: bill.id,
        amount: bill.amount,
        date: bill.date,
        participants: participants
    };
}

module.exports = { addParticipant, getParticipants, addBill, getBills, getBill }
