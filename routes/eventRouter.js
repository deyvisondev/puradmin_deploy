const express = require("express");
const router = express.Router();
const { addIssue, allIssueMotive, createIssue, getIssue, editIssue, deleteIssue } = require("../controllers/eventIssuesController")
const { addEvent, createEvent, allEvents, editEvent, getEvent, deleteEvent } = require("../controllers/eventController")
const { redirecLogin, redirectHome } = require("../middleware/authMiddleware")


// Events
router.get("/admin/event-create", redirecLogin, addEvent)
router.post("/admin/event-create", redirecLogin, createEvent)
router.get("/admin/event-list", redirecLogin, allEvents)
router.get("/admin/event-edit/:event_id", redirecLogin, getEvent)
router.post("/admin/event-edit/:event_id", redirecLogin, editEvent)
router.post("/admin/event-delete/", redirecLogin, deleteEvent)








// Issues
router.get("/admin/event-issue-list", allIssueMotive)
router.get("/admin/event-issue-create", addIssue)
router.post("/admin/event-issue-create", createIssue)
router.get("/admin/event-issue-edit/:issue_id", getIssue)
router.post("/admin/event-issue-edit/:issue_id", editIssue )
router.post("/admin/event-issue-delete", deleteIssue)

module.exports = router;