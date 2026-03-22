import { y as createActorWithConfig } from "./index-WR58nuq7.js";
let _actorPromise = null;
async function getActor() {
  if (!_actorPromise) {
    _actorPromise = createActorWithConfig();
  }
  return _actorPromise;
}
async function createSample(sampleData) {
  try {
    const actor = await getActor();
    return await actor.createSample(sampleData);
  } catch (e) {
    console.error("[backendService] createSample failed:", e);
    return null;
  }
}
async function getSamplesByMobile(mobile) {
  try {
    const actor = await getActor();
    return await actor.getSamplesByMobile(mobile);
  } catch (e) {
    console.error("[backendService] getSamplesByMobile failed:", e);
    return [];
  }
}
async function getHospitals(search) {
  try {
    const actor = await getActor();
    return await actor.getHospitals(search ?? null);
  } catch (e) {
    console.error("[backendService] getHospitals failed:", e);
    return [];
  }
}
async function getTests() {
  try {
    const actor = await getActor();
    return await actor.getAllTests();
  } catch (e) {
    console.error("[backendService] getTests failed:", e);
    return [];
  }
}
async function createTask(assigned_to_mobile, assigned_by, hospital_id, patient_name, status = "assigned") {
  try {
    const actor = await getActor();
    return await actor.createTask(
      assigned_to_mobile,
      assigned_by,
      hospital_id,
      patient_name,
      status
    );
  } catch (e) {
    console.error("[backendService] createTask failed:", e);
    return null;
  }
}
async function getTasksByUser(mobile) {
  try {
    const actor = await getActor();
    return await actor.getTasksByUser(mobile);
  } catch (e) {
    console.error("[backendService] getTasksByUser failed:", e);
    return [];
  }
}
async function getAllTasks() {
  try {
    const actor = await getActor();
    return await actor.getAllTasks();
  } catch (e) {
    console.error("[backendService] getAllTasks failed:", e);
    return [];
  }
}
async function deleteAllData() {
  try {
    const actor = await getActor();
    await actor.deleteAllData();
    return true;
  } catch (e) {
    console.error("[backendService] deleteAllData failed:", e);
    return false;
  }
}
async function getDashboardMetrics() {
  try {
    const actor = await getActor();
    const result = await actor.getDashboardMetrics();
    return {
      samplesTotal: Number(result.samplesTotal),
      samplesToday: Number(result.samplesToday),
      revenueToday: Number(result.revenueToday),
      activeHospitals: Number(result.activeHospitals),
      pendingReports: Number(result.pendingReports),
      collectionsToday: Number(result.collectionsToday)
    };
  } catch (e) {
    console.error("[backendService] getDashboardMetrics failed:", e);
    return null;
  }
}
async function getAllAppUsers() {
  try {
    const actor = await getActor();
    return await actor.getAllAppUsers();
  } catch (e) {
    console.error("[backendService] getAllAppUsers failed:", e);
    return [];
  }
}
export {
  getHospitals as a,
  getTests as b,
  createSample as c,
  getSamplesByMobile as d,
  getDashboardMetrics as e,
  deleteAllData as f,
  getTasksByUser as g,
  getAllTasks as h,
  getAllAppUsers as i,
  createTask as j
};
