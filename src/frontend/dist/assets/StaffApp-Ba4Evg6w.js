const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/TaskQueuePage-Dgqf8f7W.js","assets/index-CAVbGvzl.js","assets/index-qSTn9hol.css","assets/HealthcareBg-Sk2CFm3k.js","assets/refresh-cw-9PMGJ7U4.js","assets/createLucideIcon-bRRpT3Pk.js","assets/loader-circle-5OMa56qp.js","assets/map-pin-gEvqlTUL.js","assets/sessionUtils-D-kS_i2l.js","assets/useQueries-vGFyea1k.js","assets/clock-CQL-yB6V.js","assets/building-2-TkMcg0B9.js","assets/package-j11zyfQM.js","assets/flask-conical-CFhGjS3E.js","assets/file-text-BtxrcuZn.js","assets/house-Dw1alAnO.js","assets/search-CgxYwnaq.js","assets/ScanCampQRPage-Dy8n8ALR.js","assets/GradientButton-Bgn_PRNs.js","assets/utils-KmUdzQwa.js","assets/clsx-DgYk2OaC.js","assets/MedicalCard-C6mCgfsK.js","assets/useCamera-BAhZJe69.js","assets/formatters-DgcbtmQq.js","assets/camera-CNMi5K5n.js","assets/qr-code-BHw61Tc2.js","assets/circle-alert-H4CnXRZ1.js","assets/circle-check-big-2SRQiIfV.js","assets/RecordVitalsPage-C2_xJgh6.js","assets/heart-CXf9-SB2.js","assets/activity-CZiA_lFB.js","assets/HomeCollectionQueuePage-CYoeyoea.js","assets/navigation-BZPwE5AU.js","assets/PhlebotomistAttendancePage-CeV9iNyr.js","assets/dollar-sign-B9aJO3m_.js","assets/AddHospitalSamplePage-AxDFtyQp.js","assets/PageHeroHeader-D3XhRaFv.js","assets/plus-CIuwFXUl.js","assets/minus-Da9MJ8eb.js","assets/indian-rupee-BZNxoGA4.js","assets/MyHospitalSamplesPage-22Ma5YXt.js","assets/WhatsAppShareConfirmDialog-CFyZF-WY.js","assets/button-BTcB_mnN.js","assets/index-SZKVjfoy.js","assets/index-D-h_6i0m.js","assets/index-BHpUy2Ix.js","assets/index-BHALWQrq.js","assets/alert-dialog-Bl9Pu_hS.js","assets/index-Dg69IWz_.js","assets/x-C7U3vMdp.js","assets/label-ByLNzZNa.js","assets/index-B1qId0W5.js","assets/truck-qcxGzjzO.js","assets/chevron-up-CNdgNkN5.js","assets/AdminBookingsPage-BQNKgON-.js","assets/calendar-DxIVEyoP.js","assets/UploadReportPage-Clla5Nf9.js","assets/input-DbUXAvIk.js","assets/index-nAdPOPfy.js","assets/upload-Cf6FOIWE.js","assets/AdminReportsPage-CzLnlLTI.js","assets/skeleton-DXrlqMR1.js","assets/eye-BpS76GPa.js","assets/download-CQBtQB6X.js","assets/IncidentsPage-DzGt8Vfn.js","assets/AuditLogsPage-CiscnMvT.js","assets/badge-CGjZVSz3.js","assets/lock-BWTvRE8x.js","assets/triangle-alert-ksGBB8G_.js","assets/circle-check-SZuG2LSK.js","assets/CreateCampPage-Ko05-45j.js","assets/tag-BbgYsdpm.js","assets/SubmitIncidentPage-CzCe_e1O.js","assets/AdminHospitalSamplesPage-Bwq-ic7o.js","assets/deliveryHelpers-Bz-xczlK.js","assets/microscope-BPK3k_V4.js","assets/pen-BSwwHiru.js","assets/AdminAttendancePage-D9r0AF2H.js","assets/SecurityLogsPage-CD2Hd_1Q.js","assets/TestManagementPage-Cw0Gg-gf.js","assets/table-DbNzGF-d.js","assets/backendTypes-D8qHhi2K.js","assets/profitUtils-CU3rQSve.js","assets/chevron-left-BT101Rww.js","assets/chevron-right-DYqQ6M8h.js","assets/HospitalManagementPage-DBTjo3oR.js","assets/HospitalDetailsPage-DKMJQUVI.js","assets/users-D_P3bq67.js","assets/user-check-_TxLKrb5.js","assets/SuperAdminDashboardPage-Cvw9ZYZ5.js","assets/LineChart-DCkfofQh.js","assets/RevenueSettlementsPage-B-RDiNBR.js","assets/tabs-D6LbLvvB.js","assets/ProfitDashboardPage-BKSW-rbW.js","assets/SuperAdminSettingsPage-B1mKoVbY.js","assets/StaffProfilePage-CobRFBqO.js","assets/log-out-CzT9_g4Y.js","assets/TasksManagementPage-DF7dGtvc.js"])))=>i.map(i=>d[i]);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var _disableTimeVerification, _agent, _inner, _expirationTime, _rawKey, _derKey, _currentInterval, _randomizationFactor, _multiplier, _maxInterval, _startTime, _maxElapsedTime, _maxIterations, _date, _count, _rootKeyPromise, _shouldFetchRootKey, _timeDiffMsecs, _hasSyncedTime, _syncTimePromise, _shouldSyncTime, _identity, _fetch, _fetchOptions, _callOptions, _credentials, _retryTimes, _backoffStrategy, _maxIngressExpiryInMinutes, _HttpAgent_instances, maxIngressExpiryInMs_get, _queryPipeline, _updatePipeline, _subnetKeys, _verifyQuerySignatures, requestAndRetryQuery_fn, requestAndRetry_fn, _verifyQueryResponse, asyncGuard_fn, rootKeyGuard_fn, syncTimeGuard_fn;
import { r as reactExports, j as jsxRuntimeExports, R as React, a as useQueryClient, L as LoadingScreen, E as ErrorBoundary, _ as __vitePreload } from "./index-CAVbGvzl.js";
import { u as useGetCallerUserProfile } from "./useQueries-vGFyea1k.js";
import { b as bytesToHex, P as Principal$2, c as concatBytes, s as sha256, a as abytes, h as hexToBytes, i as isBytes, d as anumber, u as utf8ToBytes, r as randomBytes, e as sha512, f as Phone, S as Shield, g as saveSession, U as User, j as getSession } from "./sessionUtils-D-kS_i2l.js";
import { H as HealthcareBg } from "./HealthcareBg-Sk2CFm3k.js";
import { L as LoaderCircle } from "./loader-circle-5OMa56qp.js";
import { c as createLucideIcon } from "./createLucideIcon-bRRpT3Pk.js";
import { C as Clock } from "./clock-CQL-yB6V.js";
import { B as Building2 } from "./building-2-TkMcg0B9.js";
import { P as Package } from "./package-j11zyfQM.js";
import { F as FlaskConical } from "./flask-conical-CFhGjS3E.js";
import { F as FileText } from "./file-text-BtxrcuZn.js";
import { M as MapPin } from "./map-pin-gEvqlTUL.js";
import { H as House } from "./house-Dw1alAnO.js";
import { S as Search } from "./search-CgxYwnaq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$a = [
  ["rect", { width: "20", height: "12", x: "2", y: "6", rx: "2", key: "9lu3g6" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }],
  ["path", { d: "M6 12h.01M18 12h.01", key: "113zkx" }]
];
const Banknote = createLucideIcon("banknote", __iconNode$a);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$9 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "m9 16 2 2 4-4", key: "19s6y9" }]
];
const CalendarCheck = createLucideIcon("calendar-check", __iconNode$9);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$8 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$8);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$7 = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode$7);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$6 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }],
  ["path", { d: "M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662", key: "154egf" }]
];
const CircleUser = createLucideIcon("circle-user", __iconNode$6);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["rect", { width: "8", height: "4", x: "8", y: "2", rx: "1", ry: "1", key: "tgr4d6" }],
  [
    "path",
    {
      d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",
      key: "116196"
    }
  ],
  ["path", { d: "M12 11h4", key: "1jrz19" }],
  ["path", { d: "M12 16h4", key: "n85exb" }],
  ["path", { d: "M8 11h.01", key: "1dfujw" }],
  ["path", { d: "M8 16h.01", key: "18s6g9" }]
];
const ClipboardList = createLucideIcon("clipboard-list", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
  ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
  ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
  ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
];
const LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2", key: "125lnx" }],
  ["path", { d: "M8.5 2h7", key: "csnxdl" }],
  ["path", { d: "M14.5 16h-5", key: "1ox875" }]
];
const TestTube = createLucideIcon("test-tube", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
var ReplicaRejectCode;
(function(ReplicaRejectCode2) {
  ReplicaRejectCode2[ReplicaRejectCode2["SysFatal"] = 1] = "SysFatal";
  ReplicaRejectCode2[ReplicaRejectCode2["SysTransient"] = 2] = "SysTransient";
  ReplicaRejectCode2[ReplicaRejectCode2["DestinationInvalid"] = 3] = "DestinationInvalid";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterReject"] = 4] = "CanisterReject";
  ReplicaRejectCode2[ReplicaRejectCode2["CanisterError"] = 5] = "CanisterError";
})(ReplicaRejectCode || (ReplicaRejectCode = {}));
var QueryResponseStatus;
(function(QueryResponseStatus2) {
  QueryResponseStatus2["Replied"] = "replied";
  QueryResponseStatus2["Rejected"] = "rejected";
})(QueryResponseStatus || (QueryResponseStatus = {}));
function isV2ResponseBody(body) {
  return body !== null && body !== void 0 && "reject_code" in body;
}
function isV3ResponseBody(body) {
  return body !== null && body !== void 0 && "certificate" in body;
}
var ErrorKindEnum;
(function(ErrorKindEnum2) {
  ErrorKindEnum2["Trust"] = "Trust";
  ErrorKindEnum2["Protocol"] = "Protocol";
  ErrorKindEnum2["Reject"] = "Reject";
  ErrorKindEnum2["Transport"] = "Transport";
  ErrorKindEnum2["External"] = "External";
  ErrorKindEnum2["Limit"] = "Limit";
  ErrorKindEnum2["Input"] = "Input";
  ErrorKindEnum2["Unknown"] = "Unknown";
})(ErrorKindEnum || (ErrorKindEnum = {}));
class ErrorCode {
  constructor(isCertified = false) {
    this.isCertified = isCertified;
  }
  toString() {
    let errorMessage = this.toErrorMessage();
    if (this.requestContext) {
      errorMessage += `
Request context:
  Request ID (hex): ${this.requestContext.requestId ? bytesToHex(this.requestContext.requestId) : "undefined"}
  Sender pubkey (hex): ${bytesToHex(this.requestContext.senderPubKey)}
  Sender signature (hex): ${bytesToHex(this.requestContext.senderSignature)}
  Ingress expiry: ${this.requestContext.ingressExpiry.toString()}`;
    }
    if (this.callContext) {
      errorMessage += `
Call context:
  Canister ID: ${this.callContext.canisterId.toText()}
  Method name: ${this.callContext.methodName}
  HTTP details: ${JSON.stringify(this.callContext.httpDetails, null, 2)}`;
    }
    return errorMessage;
  }
}
class AgentError extends Error {
  get code() {
    return this.cause.code;
  }
  set code(code) {
    this.cause.code = code;
  }
  get kind() {
    return this.cause.kind;
  }
  set kind(kind) {
    this.cause.kind = kind;
  }
  /**
   * Reads the `isCertified` property of the underlying error code.
   * @returns `true` if the error is certified, `false` otherwise.
   */
  get isCertified() {
    return this.code.isCertified;
  }
  constructor(code, kind) {
    super(code.toString());
    this.name = "AgentError";
    this.cause = { code, kind };
    Object.setPrototypeOf(this, AgentError.prototype);
  }
  hasCode(code) {
    return this.code instanceof code;
  }
  toString() {
    return `${this.name} (${this.kind}): ${this.message}`;
  }
}
class ErrorKind extends AgentError {
  static fromCode(code) {
    return new this(code);
  }
}
class TrustError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Trust);
    this.name = "TrustError";
    Object.setPrototypeOf(this, TrustError.prototype);
  }
}
class ProtocolError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Protocol);
    this.name = "ProtocolError";
    Object.setPrototypeOf(this, ProtocolError.prototype);
  }
}
class RejectError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Reject);
    this.name = "RejectError";
    Object.setPrototypeOf(this, RejectError.prototype);
  }
}
class TransportError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Transport);
    this.name = "TransportError";
    Object.setPrototypeOf(this, TransportError.prototype);
  }
}
class ExternalError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.External);
    this.name = "ExternalError";
    Object.setPrototypeOf(this, ExternalError.prototype);
  }
}
class InputError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Input);
    this.name = "InputError";
    Object.setPrototypeOf(this, InputError.prototype);
  }
}
class UnknownError extends ErrorKind {
  constructor(code) {
    super(code, ErrorKindEnum.Unknown);
    this.name = "UnknownError";
    Object.setPrototypeOf(this, UnknownError.prototype);
  }
}
class CertificateVerificationErrorCode extends ErrorCode {
  constructor(reason, error) {
    super();
    this.reason = reason;
    this.error = error;
    this.name = "CertificateVerificationErrorCode";
    Object.setPrototypeOf(this, CertificateVerificationErrorCode.prototype);
  }
  toErrorMessage() {
    let errorMessage = this.reason;
    if (this.error) {
      errorMessage += `: ${formatUnknownError(this.error)}`;
    }
    return `Certificate verification error: "${errorMessage}"`;
  }
}
class CertificateTimeErrorCode extends ErrorCode {
  constructor(maxAgeInMinutes, certificateTime, currentTime, timeDiffMsecs, ageType) {
    super();
    this.maxAgeInMinutes = maxAgeInMinutes;
    this.certificateTime = certificateTime;
    this.currentTime = currentTime;
    this.timeDiffMsecs = timeDiffMsecs;
    this.ageType = ageType;
    this.name = "CertificateTimeErrorCode";
    Object.setPrototypeOf(this, CertificateTimeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Certificate is signed more than ${this.maxAgeInMinutes} minutes in the ${this.ageType}. Certificate time: ${this.certificateTime.toISOString()} Current time: ${this.currentTime.toISOString()} Clock drift: ${this.timeDiffMsecs}ms`;
  }
}
class CertificateHasTooManyDelegationsErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "CertificateHasTooManyDelegationsErrorCode";
    Object.setPrototypeOf(this, CertificateHasTooManyDelegationsErrorCode.prototype);
  }
  toErrorMessage() {
    return "Certificate has too many delegations";
  }
}
class CertificateNotAuthorizedErrorCode extends ErrorCode {
  constructor(canisterId, subnetId) {
    super();
    this.canisterId = canisterId;
    this.subnetId = subnetId;
    this.name = "CertificateNotAuthorizedErrorCode";
    Object.setPrototypeOf(this, CertificateNotAuthorizedErrorCode.prototype);
  }
  toErrorMessage() {
    return `The certificate contains a delegation that does not include the canister ${this.canisterId.toText()} in the canister_ranges field. Subnet ID: ${this.subnetId.toText()}`;
  }
}
class LookupErrorCode extends ErrorCode {
  constructor(message, lookupStatus) {
    super();
    this.message = message;
    this.lookupStatus = lookupStatus;
    this.name = "LookupErrorCode";
    Object.setPrototypeOf(this, LookupErrorCode.prototype);
  }
  toErrorMessage() {
    return `${this.message}. Lookup status: ${this.lookupStatus}`;
  }
}
class MalformedLookupFoundValueErrorCode extends ErrorCode {
  constructor(message) {
    super();
    this.message = message;
    this.name = "MalformedLookupFoundValueErrorCode";
    Object.setPrototypeOf(this, MalformedLookupFoundValueErrorCode.prototype);
  }
  toErrorMessage() {
    return this.message;
  }
}
class MissingLookupValueErrorCode extends ErrorCode {
  constructor(message) {
    super();
    this.message = message;
    this.name = "MissingLookupValueErrorCode";
    Object.setPrototypeOf(this, MissingLookupValueErrorCode.prototype);
  }
  toErrorMessage() {
    return this.message;
  }
}
class DerKeyLengthMismatchErrorCode extends ErrorCode {
  constructor(expectedLength, actualLength) {
    super();
    this.expectedLength = expectedLength;
    this.actualLength = actualLength;
    this.name = "DerKeyLengthMismatchErrorCode";
    Object.setPrototypeOf(this, DerKeyLengthMismatchErrorCode.prototype);
  }
  toErrorMessage() {
    return `BLS DER-encoded public key must be ${this.expectedLength} bytes long, but is ${this.actualLength} bytes long`;
  }
}
class DerPrefixMismatchErrorCode extends ErrorCode {
  constructor(expectedPrefix, actualPrefix) {
    super();
    this.expectedPrefix = expectedPrefix;
    this.actualPrefix = actualPrefix;
    this.name = "DerPrefixMismatchErrorCode";
    Object.setPrototypeOf(this, DerPrefixMismatchErrorCode.prototype);
  }
  toErrorMessage() {
    return `BLS DER-encoded public key is invalid. Expected the following prefix: ${bytesToHex(this.expectedPrefix)}, but got ${bytesToHex(this.actualPrefix)}`;
  }
}
class DerDecodeLengthMismatchErrorCode extends ErrorCode {
  constructor(expectedLength, actualLength) {
    super();
    this.expectedLength = expectedLength;
    this.actualLength = actualLength;
    this.name = "DerDecodeLengthMismatchErrorCode";
    Object.setPrototypeOf(this, DerDecodeLengthMismatchErrorCode.prototype);
  }
  toErrorMessage() {
    return `DER payload mismatch: Expected length ${this.expectedLength}, actual length: ${this.actualLength}`;
  }
}
class DerDecodeErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "DerDecodeErrorCode";
    Object.setPrototypeOf(this, DerDecodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to decode DER: ${this.error}`;
  }
}
class DerEncodeErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "DerEncodeErrorCode";
    Object.setPrototypeOf(this, DerEncodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to encode DER: ${this.error}`;
  }
}
class CborDecodeErrorCode extends ErrorCode {
  constructor(error, input) {
    super();
    this.error = error;
    this.input = input;
    this.name = "CborDecodeErrorCode";
    Object.setPrototypeOf(this, CborDecodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to decode CBOR: ${formatUnknownError(this.error)}, input: ${bytesToHex(this.input)}`;
  }
}
class CborEncodeErrorCode extends ErrorCode {
  constructor(error, value) {
    super();
    this.error = error;
    this.value = value;
    this.name = "CborEncodeErrorCode";
    Object.setPrototypeOf(this, CborEncodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to encode CBOR: ${formatUnknownError(this.error)}, input: ${this.value}`;
  }
}
class TimeoutWaitingForResponseErrorCode extends ErrorCode {
  constructor(message, requestId, status) {
    super();
    this.message = message;
    this.requestId = requestId;
    this.status = status;
    this.name = "TimeoutWaitingForResponseErrorCode";
    Object.setPrototypeOf(this, TimeoutWaitingForResponseErrorCode.prototype);
  }
  toErrorMessage() {
    let errorMessage = `${this.message}
`;
    if (this.requestId) {
      errorMessage += `  Request ID: ${bytesToHex(this.requestId)}
`;
    }
    if (this.status) {
      errorMessage += `  Request status: ${this.status}
`;
    }
    return errorMessage;
  }
}
class CertificateOutdatedErrorCode extends ErrorCode {
  constructor(maxIngressExpiryInMinutes, requestId, retryTimes) {
    super();
    this.maxIngressExpiryInMinutes = maxIngressExpiryInMinutes;
    this.requestId = requestId;
    this.retryTimes = retryTimes;
    this.name = "CertificateOutdatedErrorCode";
    Object.setPrototypeOf(this, CertificateOutdatedErrorCode.prototype);
  }
  toErrorMessage() {
    let errorMessage = `Certificate is stale (over ${this.maxIngressExpiryInMinutes} minutes). Is the computer's clock synchronized?
  Request ID: ${bytesToHex(this.requestId)}
`;
    if (this.retryTimes !== void 0) {
      errorMessage += `  Retried ${this.retryTimes} times.`;
    }
    return errorMessage;
  }
}
class CertifiedRejectErrorCode extends ErrorCode {
  constructor(requestId, rejectCode, rejectMessage, rejectErrorCode) {
    super(true);
    this.requestId = requestId;
    this.rejectCode = rejectCode;
    this.rejectMessage = rejectMessage;
    this.rejectErrorCode = rejectErrorCode;
    this.name = "CertifiedRejectErrorCode";
    Object.setPrototypeOf(this, CertifiedRejectErrorCode.prototype);
  }
  toErrorMessage() {
    return `The replica returned a rejection error:
  Request ID: ${bytesToHex(this.requestId)}
  Reject code: ${this.rejectCode}
  Reject text: ${this.rejectMessage}
  Error code: ${this.rejectErrorCode}
`;
  }
}
class UncertifiedRejectErrorCode extends ErrorCode {
  constructor(requestId, rejectCode, rejectMessage, rejectErrorCode, signatures) {
    super();
    this.requestId = requestId;
    this.rejectCode = rejectCode;
    this.rejectMessage = rejectMessage;
    this.rejectErrorCode = rejectErrorCode;
    this.signatures = signatures;
    this.name = "UncertifiedRejectErrorCode";
    Object.setPrototypeOf(this, UncertifiedRejectErrorCode.prototype);
  }
  toErrorMessage() {
    return `The replica returned a rejection error:
  Request ID: ${bytesToHex(this.requestId)}
  Reject code: ${this.rejectCode}
  Reject text: ${this.rejectMessage}
  Error code: ${this.rejectErrorCode}
`;
  }
}
class UncertifiedRejectUpdateErrorCode extends ErrorCode {
  constructor(requestId, rejectCode, rejectMessage, rejectErrorCode) {
    super();
    this.requestId = requestId;
    this.rejectCode = rejectCode;
    this.rejectMessage = rejectMessage;
    this.rejectErrorCode = rejectErrorCode;
    this.name = "UncertifiedRejectUpdateErrorCode";
    Object.setPrototypeOf(this, UncertifiedRejectUpdateErrorCode.prototype);
  }
  toErrorMessage() {
    return `The replica returned a rejection error:
  Request ID: ${bytesToHex(this.requestId)}
  Reject code: ${this.rejectCode}
  Reject text: ${this.rejectMessage}
  Error code: ${this.rejectErrorCode}
`;
  }
}
class RequestStatusDoneNoReplyErrorCode extends ErrorCode {
  constructor(requestId) {
    super();
    this.requestId = requestId;
    this.name = "RequestStatusDoneNoReplyErrorCode";
    Object.setPrototypeOf(this, RequestStatusDoneNoReplyErrorCode.prototype);
  }
  toErrorMessage() {
    return `Call was marked as done but we never saw the reply:
  Request ID: ${bytesToHex(this.requestId)}
`;
  }
}
class MissingRootKeyErrorCode extends ErrorCode {
  constructor(shouldFetchRootKey) {
    super();
    this.shouldFetchRootKey = shouldFetchRootKey;
    this.name = "MissingRootKeyErrorCode";
    Object.setPrototypeOf(this, MissingRootKeyErrorCode.prototype);
  }
  toErrorMessage() {
    if (this.shouldFetchRootKey === void 0) {
      return "Agent is missing root key";
    }
    return `Agent is missing root key and the shouldFetchRootKey value is set to ${this.shouldFetchRootKey}. The root key should only be unknown if you are in local development. Otherwise you should avoid fetching and use the default IC Root Key or the known root key of your environment.`;
  }
}
class HashValueErrorCode extends ErrorCode {
  constructor(value) {
    super();
    this.value = value;
    this.name = "HashValueErrorCode";
    Object.setPrototypeOf(this, HashValueErrorCode.prototype);
  }
  toErrorMessage() {
    return `Attempt to hash a value of unsupported type: ${this.value}`;
  }
}
class HttpDefaultFetchErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "HttpDefaultFetchErrorCode";
    Object.setPrototypeOf(this, HttpDefaultFetchErrorCode.prototype);
  }
  toErrorMessage() {
    return this.error;
  }
}
class IdentityInvalidErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "IdentityInvalidErrorCode";
    Object.setPrototypeOf(this, IdentityInvalidErrorCode.prototype);
  }
  toErrorMessage() {
    return "This identity has expired due this application's security policy. Please refresh your authentication.";
  }
}
class IngressExpiryInvalidErrorCode extends ErrorCode {
  constructor(message, providedIngressExpiryInMinutes) {
    super();
    this.message = message;
    this.providedIngressExpiryInMinutes = providedIngressExpiryInMinutes;
    this.name = "IngressExpiryInvalidErrorCode";
    Object.setPrototypeOf(this, IngressExpiryInvalidErrorCode.prototype);
  }
  toErrorMessage() {
    return `${this.message}. Provided ingress expiry time is ${this.providedIngressExpiryInMinutes} minutes.`;
  }
}
class CreateHttpAgentErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "CreateHttpAgentErrorCode";
    Object.setPrototypeOf(this, CreateHttpAgentErrorCode.prototype);
  }
  toErrorMessage() {
    return "Failed to create agent from provided agent";
  }
}
class MalformedSignatureErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "MalformedSignatureErrorCode";
    Object.setPrototypeOf(this, MalformedSignatureErrorCode.prototype);
  }
  toErrorMessage() {
    return `Query response contained a malformed signature: ${this.error}`;
  }
}
class MissingSignatureErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "MissingSignatureErrorCode";
    Object.setPrototypeOf(this, MissingSignatureErrorCode.prototype);
  }
  toErrorMessage() {
    return "Query response did not contain any node signatures";
  }
}
class MalformedPublicKeyErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "MalformedPublicKeyErrorCode";
    Object.setPrototypeOf(this, MalformedPublicKeyErrorCode.prototype);
  }
  toErrorMessage() {
    return "Read state response contained a malformed public key";
  }
}
class QuerySignatureVerificationFailedErrorCode extends ErrorCode {
  constructor(nodeId) {
    super();
    this.nodeId = nodeId;
    this.name = "QuerySignatureVerificationFailedErrorCode";
    Object.setPrototypeOf(this, QuerySignatureVerificationFailedErrorCode.prototype);
  }
  toErrorMessage() {
    return `Query signature verification failed. Node ID: ${this.nodeId}`;
  }
}
class UnexpectedErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "UnexpectedErrorCode";
    Object.setPrototypeOf(this, UnexpectedErrorCode.prototype);
  }
  toErrorMessage() {
    return `Unexpected error: ${formatUnknownError(this.error)}`;
  }
}
class HashTreeDecodeErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "HashTreeDecodeErrorCode";
    Object.setPrototypeOf(this, HashTreeDecodeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to decode certificate: ${this.error}`;
  }
}
class HttpErrorCode extends ErrorCode {
  constructor(status, statusText, headers, bodyText) {
    super();
    this.status = status;
    this.statusText = statusText;
    this.headers = headers;
    this.bodyText = bodyText;
    this.name = "HttpErrorCode";
    Object.setPrototypeOf(this, HttpErrorCode.prototype);
  }
  toErrorMessage() {
    let errorMessage = `HTTP request failed:
  Status: ${this.status} (${this.statusText})
  Headers: ${JSON.stringify(this.headers)}
`;
    if (this.bodyText) {
      errorMessage += `  Body: ${this.bodyText}
`;
    }
    return errorMessage;
  }
}
class HttpV3ApiNotSupportedErrorCode extends ErrorCode {
  constructor() {
    super();
    this.name = "HttpV3ApiNotSupportedErrorCode";
    Object.setPrototypeOf(this, HttpV3ApiNotSupportedErrorCode.prototype);
  }
  toErrorMessage() {
    return "HTTP request failed: v3 API is not supported";
  }
}
class HttpFetchErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "HttpFetchErrorCode";
    Object.setPrototypeOf(this, HttpFetchErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to fetch HTTP request: ${formatUnknownError(this.error)}`;
  }
}
class MissingCanisterIdErrorCode extends ErrorCode {
  constructor(receivedCanisterId) {
    super();
    this.receivedCanisterId = receivedCanisterId;
    this.name = "MissingCanisterIdErrorCode";
    Object.setPrototypeOf(this, MissingCanisterIdErrorCode.prototype);
  }
  toErrorMessage() {
    return `Canister ID is required, but received ${typeof this.receivedCanisterId} instead. If you are using automatically generated declarations, this may be because your application is not setting the canister ID in process.env correctly.`;
  }
}
class InvalidReadStateRequestErrorCode extends ErrorCode {
  constructor(request2) {
    super();
    this.request = request2;
    this.name = "InvalidReadStateRequestErrorCode";
    Object.setPrototypeOf(this, InvalidReadStateRequestErrorCode.prototype);
  }
  toErrorMessage() {
    return `Invalid read state request: ${this.request}`;
  }
}
class ExpiryJsonDeserializeErrorCode extends ErrorCode {
  constructor(error) {
    super();
    this.error = error;
    this.name = "ExpiryJsonDeserializeErrorCode";
    Object.setPrototypeOf(this, ExpiryJsonDeserializeErrorCode.prototype);
  }
  toErrorMessage() {
    return `Failed to deserialize expiry: ${this.error}`;
  }
}
function formatUnknownError(error) {
  if (error instanceof Error) {
    return error.stack ?? error.message;
  }
  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}
const UNREACHABLE_ERROR = new Error("unreachable");
function concat(...uint8Arrays) {
  const result = new Uint8Array(uint8Arrays.reduce((acc, curr) => acc + curr.byteLength, 0));
  let index = 0;
  for (const b2 of uint8Arrays) {
    result.set(b2, index);
    index += b2.byteLength;
  }
  return result;
}
class PipeArrayBuffer {
  /**
   * Save a checkpoint of the reading view (for backtracking)
   */
  save() {
    return this._view;
  }
  /**
   * Restore a checkpoint of the reading view (for backtracking)
   * @param checkPoint a previously saved checkpoint
   */
  restore(checkPoint) {
    if (!(checkPoint instanceof Uint8Array)) {
      throw new Error("Checkpoint must be a Uint8Array");
    }
    this._view = checkPoint;
  }
  /**
   * Creates a new instance of a pipe
   * @param buffer an optional buffer to start with
   * @param length an optional amount of bytes to use for the length.
   */
  constructor(buffer, length = (buffer == null ? void 0 : buffer.byteLength) || 0) {
    if (buffer && !(buffer instanceof Uint8Array)) {
      try {
        buffer = uint8FromBufLike$1(buffer);
      } catch {
        throw new Error("Buffer must be a Uint8Array");
      }
    }
    if (length < 0 || !Number.isInteger(length)) {
      throw new Error("Length must be a non-negative integer");
    }
    if (buffer && length > buffer.byteLength) {
      throw new Error("Length cannot exceed buffer length");
    }
    this._buffer = buffer || new Uint8Array(0);
    this._view = new Uint8Array(this._buffer.buffer, 0, length);
  }
  get buffer() {
    return this._view.slice();
  }
  get byteLength() {
    return this._view.byteLength;
  }
  /**
   * Read `num` number of bytes from the front of the pipe.
   * @param num The number of bytes to read.
   */
  read(num) {
    const result = this._view.subarray(0, num);
    this._view = this._view.subarray(num);
    return result.slice();
  }
  readUint8() {
    if (this._view.byteLength === 0) {
      return void 0;
    }
    const result = this._view[0];
    this._view = this._view.subarray(1);
    return result;
  }
  /**
   * Write a buffer to the end of the pipe.
   * @param buf The bytes to write.
   */
  write(buf) {
    if (!(buf instanceof Uint8Array)) {
      throw new Error("Buffer must be a Uint8Array");
    }
    const offset = this._view.byteLength;
    if (this._view.byteOffset + this._view.byteLength + buf.byteLength >= this._buffer.byteLength) {
      this.alloc(buf.byteLength);
    } else {
      this._view = new Uint8Array(this._buffer.buffer, this._view.byteOffset, this._view.byteLength + buf.byteLength);
    }
    this._view.set(buf, offset);
  }
  /**
   * Whether or not there is more data to read from the buffer
   */
  get end() {
    return this._view.byteLength === 0;
  }
  /**
   * Allocate a fixed amount of memory in the buffer. This does not affect the view.
   * @param amount A number of bytes to add to the buffer.
   */
  alloc(amount) {
    if (amount <= 0 || !Number.isInteger(amount)) {
      throw new Error("Amount must be a positive integer");
    }
    const b2 = new Uint8Array((this._buffer.byteLength + amount) * 1.2 | 0);
    const v2 = new Uint8Array(b2.buffer, 0, this._view.byteLength + amount);
    v2.set(this._view);
    this._buffer = b2;
    this._view = v2;
  }
}
function uint8FromBufLike$1(bufLike) {
  if (!bufLike) {
    throw new Error("Input cannot be null or undefined");
  }
  if (bufLike instanceof Uint8Array) {
    return bufLike;
  }
  if (bufLike instanceof ArrayBuffer) {
    return new Uint8Array(bufLike);
  }
  if (Array.isArray(bufLike)) {
    return new Uint8Array(bufLike);
  }
  if ("buffer" in bufLike) {
    return uint8FromBufLike$1(bufLike.buffer);
  }
  return new Uint8Array(bufLike);
}
function compare(u1, u2) {
  if (u1.byteLength !== u2.byteLength) {
    return u1.byteLength - u2.byteLength;
  }
  for (let i = 0; i < u1.length; i++) {
    if (u1[i] !== u2[i]) {
      return u1[i] - u2[i];
    }
  }
  return 0;
}
function uint8ToDataView(uint8) {
  if (!(uint8 instanceof Uint8Array)) {
    throw new Error("Input must be a Uint8Array");
  }
  return new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
}
function idlHash(s2) {
  const utf8encoder = new TextEncoder();
  const array = utf8encoder.encode(s2);
  let h2 = 0;
  for (const c2 of array) {
    h2 = (h2 * 223 + c2) % 2 ** 32;
  }
  return h2;
}
function idlLabelToId(label) {
  if (/^_\d+_$/.test(label) || /^_0x[0-9a-fA-F]+_$/.test(label)) {
    const num = +label.slice(1, -1);
    if (Number.isSafeInteger(num) && num >= 0 && num < 2 ** 32) {
      return num;
    }
  }
  return idlHash(label);
}
function ilog2(n) {
  const nBig = BigInt(n);
  if (n <= 0) {
    throw new RangeError("Input must be positive");
  }
  return nBig.toString(2).length - 1;
}
function iexp2(n) {
  const nBig = BigInt(n);
  if (n < 0) {
    throw new RangeError("Input must be non-negative");
  }
  return BigInt(1) << nBig;
}
function eob() {
  throw new Error("unexpected end of buffer");
}
function safeRead(pipe, num) {
  if (pipe.byteLength < num) {
    eob();
  }
  return pipe.read(num);
}
function safeReadUint8(pipe) {
  const byte = pipe.readUint8();
  if (byte === void 0) {
    eob();
  }
  return byte;
}
function lebEncode(value) {
  if (typeof value === "number") {
    value = BigInt(value);
  }
  if (value < BigInt(0)) {
    throw new Error("Cannot leb encode negative values.");
  }
  const byteLength = (value === BigInt(0) ? 0 : ilog2(value)) + 1;
  const pipe = new PipeArrayBuffer(new Uint8Array(byteLength), 0);
  while (true) {
    const i = Number(value & BigInt(127));
    value /= BigInt(128);
    if (value === BigInt(0)) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  return pipe.buffer;
}
function lebDecode(pipe) {
  let weight = BigInt(1);
  let value = BigInt(0);
  let byte;
  do {
    byte = safeReadUint8(pipe);
    value += BigInt(byte & 127).valueOf() * weight;
    weight *= BigInt(128);
  } while (byte >= 128);
  return value;
}
function slebEncode(value) {
  if (typeof value === "number") {
    value = BigInt(value);
  }
  const isNeg = value < BigInt(0);
  if (isNeg) {
    value = -value - BigInt(1);
  }
  const byteLength = (value === BigInt(0) ? 0 : ilog2(value)) + 1;
  const pipe = new PipeArrayBuffer(new Uint8Array(byteLength), 0);
  while (true) {
    const i = getLowerBytes(value);
    value /= BigInt(128);
    if (isNeg && value === BigInt(0) && (i & 64) !== 0 || !isNeg && value === BigInt(0) && (i & 64) === 0) {
      pipe.write(new Uint8Array([i]));
      break;
    } else {
      pipe.write(new Uint8Array([i | 128]));
    }
  }
  function getLowerBytes(num) {
    const bytes = num % BigInt(128);
    if (isNeg) {
      return Number(BigInt(128) - bytes - BigInt(1));
    } else {
      return Number(bytes);
    }
  }
  return pipe.buffer;
}
function slebDecode(pipe) {
  const pipeView = new Uint8Array(pipe.buffer);
  let len = 0;
  for (; len < pipeView.byteLength; len++) {
    if (pipeView[len] < 128) {
      if ((pipeView[len] & 64) === 0) {
        return lebDecode(pipe);
      }
      break;
    }
  }
  const bytes = new Uint8Array(safeRead(pipe, len + 1));
  let value = BigInt(0);
  for (let i = bytes.byteLength - 1; i >= 0; i--) {
    value = value * BigInt(128) + BigInt(128 - (bytes[i] & 127) - 1);
  }
  return -value - BigInt(1);
}
function writeUIntLE(value, byteLength) {
  if (BigInt(value) < BigInt(0)) {
    throw new Error("Cannot write negative values.");
  }
  return writeIntLE(value, byteLength);
}
function writeIntLE(value, byteLength) {
  value = BigInt(value);
  const pipe = new PipeArrayBuffer(new Uint8Array(Math.min(1, byteLength)), 0);
  let i = 0;
  let mul = BigInt(256);
  let sub = BigInt(0);
  let byte = Number(value % mul);
  pipe.write(new Uint8Array([byte]));
  while (++i < byteLength) {
    if (value < 0 && sub === BigInt(0) && byte !== 0) {
      sub = BigInt(1);
    }
    byte = Number((value / mul - sub) % BigInt(256));
    pipe.write(new Uint8Array([byte]));
    mul *= BigInt(256);
  }
  return pipe.buffer;
}
function readUIntLE(pipe, byteLength) {
  if (byteLength <= 0 || !Number.isInteger(byteLength)) {
    throw new Error("Byte length must be a positive integer");
  }
  let val = BigInt(safeReadUint8(pipe));
  let mul = BigInt(1);
  let i = 0;
  while (++i < byteLength) {
    mul *= BigInt(256);
    const byte = BigInt(safeReadUint8(pipe));
    val = val + mul * byte;
  }
  return val;
}
function readIntLE(pipe, byteLength) {
  if (byteLength <= 0 || !Number.isInteger(byteLength)) {
    throw new Error("Byte length must be a positive integer");
  }
  let val = readUIntLE(pipe, byteLength);
  const mul = BigInt(2) ** (BigInt(8) * BigInt(byteLength - 1) + BigInt(7));
  if (val >= mul) {
    val -= mul * BigInt(2);
  }
  return val;
}
var IDLTypeIds;
(function(IDLTypeIds2) {
  IDLTypeIds2[IDLTypeIds2["Null"] = -1] = "Null";
  IDLTypeIds2[IDLTypeIds2["Bool"] = -2] = "Bool";
  IDLTypeIds2[IDLTypeIds2["Nat"] = -3] = "Nat";
  IDLTypeIds2[IDLTypeIds2["Int"] = -4] = "Int";
  IDLTypeIds2[IDLTypeIds2["Float32"] = -13] = "Float32";
  IDLTypeIds2[IDLTypeIds2["Float64"] = -14] = "Float64";
  IDLTypeIds2[IDLTypeIds2["Text"] = -15] = "Text";
  IDLTypeIds2[IDLTypeIds2["Reserved"] = -16] = "Reserved";
  IDLTypeIds2[IDLTypeIds2["Empty"] = -17] = "Empty";
  IDLTypeIds2[IDLTypeIds2["Opt"] = -18] = "Opt";
  IDLTypeIds2[IDLTypeIds2["Vector"] = -19] = "Vector";
  IDLTypeIds2[IDLTypeIds2["Record"] = -20] = "Record";
  IDLTypeIds2[IDLTypeIds2["Variant"] = -21] = "Variant";
  IDLTypeIds2[IDLTypeIds2["Func"] = -22] = "Func";
  IDLTypeIds2[IDLTypeIds2["Service"] = -23] = "Service";
  IDLTypeIds2[IDLTypeIds2["Principal"] = -24] = "Principal";
})(IDLTypeIds || (IDLTypeIds = {}));
const magicNumber = "DIDL";
const toReadableString_max = 400;
function zipWith(xs, ys, f) {
  return xs.map((x2, i) => f(x2, ys[i]));
}
class TypeTable {
  constructor() {
    this._typs = [];
    this._idx = /* @__PURE__ */ new Map();
    this._idxRefCount = /* @__PURE__ */ new Map();
  }
  has(obj) {
    return this._idx.has(obj.name);
  }
  add(type, buf) {
    const idx = this._typs.length;
    this._idx.set(type.name, idx);
    this._idxRefCount.set(idx, 1);
    this._typs.push(buf);
  }
  merge(obj, knot) {
    const idx = this._idx.get(obj.name);
    const knotIdx = this._idx.get(knot);
    if (idx === void 0) {
      throw new Error("Missing type index for " + obj);
    }
    if (knotIdx === void 0) {
      throw new Error("Missing type index for " + knot);
    }
    this._typs[idx] = this._typs[knotIdx];
    const idxRefCount = this._getIdxRefCount(idx);
    const knotRefCount = this._getIdxRefCount(knotIdx);
    this._idxRefCount.set(idx, idxRefCount + knotRefCount);
    this._idx.set(knot, idx);
    this._idxRefCount.set(knotIdx, 0);
    this._compactFromEnd();
  }
  _getIdxRefCount(idx) {
    return this._idxRefCount.get(idx) || 0;
  }
  _compactFromEnd() {
    while (this._typs.length > 0) {
      const lastIndex = this._typs.length - 1;
      if (this._getIdxRefCount(lastIndex) > 0) {
        break;
      }
      this._typs.pop();
      this._idxRefCount.delete(lastIndex);
    }
  }
  encode() {
    const len = lebEncode(this._typs.length);
    const buf = concat(...this._typs);
    return concat(len, buf);
  }
  indexOf(typeName) {
    if (!this._idx.has(typeName)) {
      throw new Error("Missing type index for " + typeName);
    }
    return slebEncode(this._idx.get(typeName) || 0);
  }
}
class Visitor {
  visitType(_t, _data) {
    throw new Error("Not implemented");
  }
  visitPrimitive(t, data) {
    return this.visitType(t, data);
  }
  visitEmpty(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitBool(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitNull(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitReserved(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitText(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitNumber(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitInt(t, data) {
    return this.visitNumber(t, data);
  }
  visitNat(t, data) {
    return this.visitNumber(t, data);
  }
  visitFloat(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitFixedInt(t, data) {
    return this.visitNumber(t, data);
  }
  visitFixedNat(t, data) {
    return this.visitNumber(t, data);
  }
  visitPrincipal(t, data) {
    return this.visitPrimitive(t, data);
  }
  visitConstruct(t, data) {
    return this.visitType(t, data);
  }
  visitVec(t, _ty, data) {
    return this.visitConstruct(t, data);
  }
  visitOpt(t, _ty, data) {
    return this.visitConstruct(t, data);
  }
  visitRecord(t, _fields, data) {
    return this.visitConstruct(t, data);
  }
  visitTuple(t, components, data) {
    const fields = components.map((ty, i) => [`_${i}_`, ty]);
    return this.visitRecord(t, fields, data);
  }
  visitVariant(t, _fields, data) {
    return this.visitConstruct(t, data);
  }
  visitRec(_t, ty, data) {
    return this.visitConstruct(ty, data);
  }
  visitFunc(t, data) {
    return this.visitConstruct(t, data);
  }
  visitService(t, data) {
    return this.visitConstruct(t, data);
  }
}
var IdlTypeName;
(function(IdlTypeName2) {
  IdlTypeName2["EmptyClass"] = "__IDL_EmptyClass__";
  IdlTypeName2["UnknownClass"] = "__IDL_UnknownClass__";
  IdlTypeName2["BoolClass"] = "__IDL_BoolClass__";
  IdlTypeName2["NullClass"] = "__IDL_NullClass__";
  IdlTypeName2["ReservedClass"] = "__IDL_ReservedClass__";
  IdlTypeName2["TextClass"] = "__IDL_TextClass__";
  IdlTypeName2["IntClass"] = "__IDL_IntClass__";
  IdlTypeName2["NatClass"] = "__IDL_NatClass__";
  IdlTypeName2["FloatClass"] = "__IDL_FloatClass__";
  IdlTypeName2["FixedIntClass"] = "__IDL_FixedIntClass__";
  IdlTypeName2["FixedNatClass"] = "__IDL_FixedNatClass__";
  IdlTypeName2["VecClass"] = "__IDL_VecClass__";
  IdlTypeName2["OptClass"] = "__IDL_OptClass__";
  IdlTypeName2["RecordClass"] = "__IDL_RecordClass__";
  IdlTypeName2["TupleClass"] = "__IDL_TupleClass__";
  IdlTypeName2["VariantClass"] = "__IDL_VariantClass__";
  IdlTypeName2["RecClass"] = "__IDL_RecClass__";
  IdlTypeName2["PrincipalClass"] = "__IDL_PrincipalClass__";
  IdlTypeName2["FuncClass"] = "__IDL_FuncClass__";
  IdlTypeName2["ServiceClass"] = "__IDL_ServiceClass__";
})(IdlTypeName || (IdlTypeName = {}));
class Type {
  /* Display type name */
  display() {
    return this.name;
  }
  valueToString(x2) {
    return toReadableString(x2);
  }
  /* Implement `T` in the IDL spec, only needed for non-primitive types */
  buildTypeTable(typeTable) {
    if (!typeTable.has(this)) {
      this._buildTypeTableImpl(typeTable);
    }
  }
}
class PrimitiveType extends Type {
  checkType(t) {
    if (this.name !== t.name) {
      throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
    }
    return t;
  }
  _buildTypeTableImpl(_typeTable) {
    return;
  }
}
class ConstructType extends Type {
  checkType(t) {
    if (t instanceof RecClass) {
      const ty = t.getType();
      if (typeof ty === "undefined") {
        throw new Error("type mismatch with uninitialized type");
      }
      return ty;
    }
    throw new Error(`type mismatch: type on the wire ${t.name}, expect type ${this.name}`);
  }
  encodeType(typeTable) {
    return typeTable.indexOf(this.name);
  }
}
class EmptyClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.EmptyClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.EmptyClass;
  }
  accept(v2, d2) {
    return v2.visitEmpty(this, d2);
  }
  covariant(x2) {
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    throw new Error("Empty cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Empty cannot appear as a value");
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Empty);
  }
  decodeValue() {
    throw new Error("Empty cannot appear as an output");
  }
  get name() {
    return "empty";
  }
}
class UnknownClass extends Type {
  get typeName() {
    return IdlTypeName.UnknownClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.UnknownClass;
  }
  checkType(_t) {
    throw new Error("Method not implemented for unknown.");
  }
  accept(v2, d2) {
    throw v2.visitType(this, d2);
  }
  covariant(x2) {
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    throw new Error("Unknown cannot appear as a function argument");
  }
  valueToString() {
    throw new Error("Unknown cannot appear as a value");
  }
  encodeType() {
    throw new Error("Unknown cannot be serialized");
  }
  decodeValue(b2, t) {
    let decodedValue = t.decodeValue(b2, t);
    if (Object(decodedValue) !== decodedValue) {
      decodedValue = Object(decodedValue);
    }
    let typeFunc;
    if (t instanceof RecClass) {
      typeFunc = () => t.getType();
    } else {
      typeFunc = () => t;
    }
    Object.defineProperty(decodedValue, "type", {
      value: typeFunc,
      writable: true,
      enumerable: false,
      configurable: true
    });
    return decodedValue;
  }
  _buildTypeTableImpl() {
    throw new Error("Unknown cannot be serialized");
  }
  get name() {
    return "Unknown";
  }
}
class BoolClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.BoolClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.BoolClass;
  }
  accept(v2, d2) {
    return v2.visitBool(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "boolean")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return new Uint8Array([x2 ? 1 : 0]);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Bool);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    switch (safeReadUint8(b2)) {
      case 0:
        return false;
      case 1:
        return true;
      default:
        throw new Error("Boolean value out of range");
    }
  }
  get name() {
    return "bool";
  }
}
class NullClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.NullClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.NullClass;
  }
  accept(v2, d2) {
    return v2.visitNull(this, d2);
  }
  covariant(x2) {
    if (x2 === null)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue() {
    return new Uint8Array(0);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Null);
  }
  decodeValue(_b2, t) {
    this.checkType(t);
    return null;
  }
  get name() {
    return "null";
  }
}
class ReservedClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.ReservedClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.ReservedClass;
  }
  accept(v2, d2) {
    return v2.visitReserved(this, d2);
  }
  covariant(_x) {
    return true;
  }
  encodeValue() {
    return new Uint8Array(0);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Reserved);
  }
  decodeValue(b2, t) {
    if (t.name !== this.name) {
      t.decodeValue(b2, t);
    }
    return null;
  }
  get name() {
    return "reserved";
  }
}
class TextClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.TextClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.TextClass;
  }
  accept(v2, d2) {
    return v2.visitText(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "string")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = new TextEncoder().encode(x2);
    const len = lebEncode(buf.byteLength);
    return concat(len, buf);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Text);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    const len = lebDecode(b2);
    const buf = safeRead(b2, Number(len));
    const decoder = new TextDecoder("utf8", { fatal: true });
    return decoder.decode(buf);
  }
  get name() {
    return "text";
  }
  valueToString(x2) {
    return '"' + x2 + '"';
  }
}
class IntClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.IntClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.IntClass;
  }
  accept(v2, d2) {
    return v2.visitInt(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "bigint" || Number.isInteger(x2))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return slebEncode(x2);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Int);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    return slebDecode(b2);
  }
  get name() {
    return "int";
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class NatClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.NatClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.NatClass;
  }
  accept(v2, d2) {
    return v2.visitNat(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "bigint" && x2 >= BigInt(0) || Number.isInteger(x2) && x2 >= 0)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return lebEncode(x2);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Nat);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    return lebDecode(b2);
  }
  get name() {
    return "nat";
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FloatClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.FloatClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.FloatClass;
  }
  constructor(_bits) {
    super();
    this._bits = _bits;
    if (_bits !== 32 && _bits !== 64) {
      throw new Error("not a valid float type");
    }
  }
  accept(v2, d2) {
    return v2.visitFloat(this, d2);
  }
  covariant(x2) {
    if (typeof x2 === "number" || x2 instanceof Number)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = new ArrayBuffer(this._bits / 8);
    const view = new DataView(buf);
    if (this._bits === 32) {
      view.setFloat32(0, x2, true);
    } else {
      view.setFloat64(0, x2, true);
    }
    return new Uint8Array(buf);
  }
  encodeType() {
    const opcode = this._bits === 32 ? IDLTypeIds.Float32 : IDLTypeIds.Float64;
    return slebEncode(opcode);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    const bytes = safeRead(b2, this._bits / 8);
    const view = uint8ToDataView(bytes);
    if (this._bits === 32) {
      return view.getFloat32(0, true);
    } else {
      return view.getFloat64(0, true);
    }
  }
  get name() {
    return "float" + this._bits;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FixedIntClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.FixedIntClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.FixedIntClass;
  }
  constructor(_bits) {
    super();
    this._bits = _bits;
  }
  accept(v2, d2) {
    return v2.visitFixedInt(this, d2);
  }
  covariant(x2) {
    const min = iexp2(this._bits - 1) * BigInt(-1);
    const max = iexp2(this._bits - 1) - BigInt(1);
    let ok = false;
    if (typeof x2 === "bigint") {
      ok = x2 >= min && x2 <= max;
    } else if (Number.isInteger(x2)) {
      const v2 = BigInt(x2);
      ok = v2 >= min && v2 <= max;
    } else {
      ok = false;
    }
    if (ok)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return writeIntLE(x2, this._bits / 8);
  }
  encodeType() {
    const offset = Math.log2(this._bits) - 3;
    return slebEncode(-9 - offset);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    const num = readIntLE(b2, this._bits / 8);
    if (this._bits <= 32) {
      return Number(num);
    } else {
      return num;
    }
  }
  get name() {
    return `int${this._bits}`;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class FixedNatClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.FixedNatClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.FixedNatClass;
  }
  constructor(_bits) {
    super();
    this._bits = _bits;
  }
  accept(v2, d2) {
    return v2.visitFixedNat(this, d2);
  }
  covariant(x2) {
    const max = iexp2(this._bits);
    let ok = false;
    if (typeof x2 === "bigint" && x2 >= BigInt(0)) {
      ok = x2 < max;
    } else if (Number.isInteger(x2) && x2 >= 0) {
      const v2 = BigInt(x2);
      ok = v2 < max;
    } else {
      ok = false;
    }
    if (ok)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    return writeUIntLE(x2, this._bits / 8);
  }
  encodeType() {
    const offset = Math.log2(this._bits) - 3;
    return slebEncode(-5 - offset);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    const num = readUIntLE(b2, this._bits / 8);
    if (this._bits <= 32) {
      return Number(num);
    } else {
      return num;
    }
  }
  get name() {
    return `nat${this._bits}`;
  }
  valueToString(x2) {
    return x2.toString();
  }
}
class VecClass extends ConstructType {
  get typeName() {
    return IdlTypeName.VecClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.VecClass;
  }
  constructor(_type) {
    super();
    this._type = _type;
    this._blobOptimization = false;
    if (_type instanceof FixedNatClass && _type._bits === 8) {
      this._blobOptimization = true;
    }
  }
  accept(v2, d2) {
    return v2.visitVec(this, this._type, d2);
  }
  covariant(x2) {
    const bits = this._type instanceof FixedNatClass ? this._type._bits : this._type instanceof FixedIntClass ? this._type._bits : 0;
    if (ArrayBuffer.isView(x2) && bits == x2.BYTES_PER_ELEMENT * 8 || Array.isArray(x2) && x2.every((v2, idx) => {
      try {
        return this._type.covariant(v2);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

index ${idx} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const len = lebEncode(x2.length);
    if (this._blobOptimization) {
      return concat(len, new Uint8Array(x2));
    }
    if (ArrayBuffer.isView(x2)) {
      if (x2 instanceof Int16Array || x2 instanceof Uint16Array) {
        const buffer = new DataView(new ArrayBuffer(x2.length * 2));
        for (let i = 0; i < x2.length; i++) {
          if (x2 instanceof Int16Array) {
            buffer.setInt16(i * 2, x2[i], true);
          } else {
            buffer.setUint16(i * 2, x2[i], true);
          }
        }
        return concat(len, new Uint8Array(buffer.buffer));
      } else if (x2 instanceof Int32Array || x2 instanceof Uint32Array) {
        const buffer = new DataView(new ArrayBuffer(x2.length * 4));
        for (let i = 0; i < x2.length; i++) {
          if (x2 instanceof Int32Array) {
            buffer.setInt32(i * 4, x2[i], true);
          } else {
            buffer.setUint32(i * 4, x2[i], true);
          }
        }
        return concat(len, new Uint8Array(buffer.buffer));
      } else if (x2 instanceof BigInt64Array || x2 instanceof BigUint64Array) {
        const buffer = new DataView(new ArrayBuffer(x2.length * 8));
        for (let i = 0; i < x2.length; i++) {
          if (x2 instanceof BigInt64Array) {
            buffer.setBigInt64(i * 8, x2[i], true);
          } else {
            buffer.setBigUint64(i * 8, x2[i], true);
          }
        }
        return concat(len, new Uint8Array(buffer.buffer));
      } else {
        return concat(len, new Uint8Array(x2.buffer, x2.byteOffset, x2.byteLength));
      }
    }
    const buf = new PipeArrayBuffer(new Uint8Array(len.byteLength + x2.length), 0);
    buf.write(len);
    for (const d2 of x2) {
      const encoded = this._type.encodeValue(d2);
      buf.write(new Uint8Array(encoded));
    }
    return buf.buffer;
  }
  _buildTypeTableImpl(typeTable) {
    this._type.buildTypeTable(typeTable);
    const opCode = slebEncode(IDLTypeIds.Vector);
    const buffer = this._type.encodeType(typeTable);
    typeTable.add(this, concat(opCode, buffer));
  }
  decodeValue(b2, t) {
    const vec = this.checkType(t);
    if (!(vec instanceof VecClass)) {
      throw new Error("Not a vector type");
    }
    const len = Number(lebDecode(b2));
    if (this._type instanceof FixedNatClass) {
      if (this._type._bits == 8) {
        return new Uint8Array(b2.read(len));
      }
      if (this._type._bits == 16) {
        const bytes = b2.read(len * 2);
        const u16 = new Uint16Array(bytes.buffer, bytes.byteOffset, len);
        return u16;
      }
      if (this._type._bits == 32) {
        const bytes = b2.read(len * 4);
        const u32 = new Uint32Array(bytes.buffer, bytes.byteOffset, len);
        return u32;
      }
      if (this._type._bits == 64) {
        return new BigUint64Array(b2.read(len * 8).buffer);
      }
    }
    if (this._type instanceof FixedIntClass) {
      if (this._type._bits == 8) {
        return new Int8Array(b2.read(len));
      }
      if (this._type._bits == 16) {
        const bytes = b2.read(len * 2);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const result = new Int16Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = view.getInt16(i * 2, true);
        }
        return result;
      }
      if (this._type._bits == 32) {
        const bytes = b2.read(len * 4);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const result = new Int32Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = view.getInt32(i * 4, true);
        }
        return result;
      }
      if (this._type._bits == 64) {
        const bytes = b2.read(len * 8);
        const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
        const result = new BigInt64Array(len);
        for (let i = 0; i < len; i++) {
          result[i] = view.getBigInt64(i * 8, true);
        }
        return result;
      }
    }
    const rets = [];
    for (let i = 0; i < len; i++) {
      rets.push(this._type.decodeValue(b2, vec._type));
    }
    return rets;
  }
  get name() {
    return `vec ${this._type.name}`;
  }
  display() {
    return `vec ${this._type.display()}`;
  }
  valueToString(x2) {
    const elements = x2.map((e) => this._type.valueToString(e));
    return "vec {" + elements.join("; ") + "}";
  }
}
class OptClass extends ConstructType {
  get typeName() {
    return IdlTypeName.OptClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.OptClass;
  }
  constructor(_type) {
    super();
    this._type = _type;
  }
  accept(v2, d2) {
    return v2.visitOpt(this, this._type, d2);
  }
  covariant(x2) {
    try {
      if (Array.isArray(x2) && (x2.length === 0 || x2.length === 1 && this._type.covariant(x2[0])))
        return true;
    } catch (e) {
      throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)} 

-> ${e.message}`);
    }
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    if (x2.length === 0) {
      return new Uint8Array([0]);
    } else {
      return concat(new Uint8Array([1]), this._type.encodeValue(x2[0]));
    }
  }
  _buildTypeTableImpl(typeTable) {
    this._type.buildTypeTable(typeTable);
    const opCode = slebEncode(IDLTypeIds.Opt);
    const buffer = this._type.encodeType(typeTable);
    typeTable.add(this, concat(opCode, buffer));
  }
  decodeValue(b2, t) {
    if (t instanceof NullClass) {
      return [];
    }
    if (t instanceof ReservedClass) {
      return [];
    }
    let wireType = t;
    if (t instanceof RecClass) {
      const ty = t.getType();
      if (typeof ty === "undefined") {
        throw new Error("type mismatch with uninitialized type");
      } else
        wireType = ty;
    }
    if (wireType instanceof OptClass) {
      switch (safeReadUint8(b2)) {
        case 0:
          return [];
        case 1: {
          const checkpoint = b2.save();
          try {
            const v2 = this._type.decodeValue(b2, wireType._type);
            return [v2];
          } catch (e) {
            b2.restore(checkpoint);
            wireType._type.decodeValue(b2, wireType._type);
            return [];
          }
        }
        default:
          throw new Error("Not an option value");
      }
    } else if (
      // this check corresponds to `not (null <: <t>)` in the spec
      this._type instanceof NullClass || this._type instanceof OptClass || this._type instanceof ReservedClass
    ) {
      wireType.decodeValue(b2, wireType);
      return [];
    } else {
      const checkpoint = b2.save();
      try {
        const v2 = this._type.decodeValue(b2, t);
        return [v2];
      } catch (e) {
        b2.restore(checkpoint);
        wireType.decodeValue(b2, t);
        return [];
      }
    }
  }
  get name() {
    return `opt ${this._type.name}`;
  }
  display() {
    return `opt ${this._type.display()}`;
  }
  valueToString(x2) {
    if (x2.length === 0) {
      return "null";
    } else {
      return `opt ${this._type.valueToString(x2[0])}`;
    }
  }
}
class RecordClass extends ConstructType {
  get typeName() {
    return IdlTypeName.RecordClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.RecordClass || instance.typeName === IdlTypeName.TupleClass;
  }
  constructor(fields = {}) {
    super();
    this._fields = Object.entries(fields).sort((a2, b2) => idlLabelToId(a2[0]) - idlLabelToId(b2[0]));
  }
  accept(v2, d2) {
    return v2.visitRecord(this, this._fields, d2);
  }
  tryAsTuple() {
    const res = [];
    for (let i = 0; i < this._fields.length; i++) {
      const [key, type] = this._fields[i];
      if (key !== `_${i}_`) {
        return null;
      }
      res.push(type);
    }
    return res;
  }
  covariant(x2) {
    if (typeof x2 === "object" && this._fields.every(([k2, t]) => {
      if (!x2.hasOwnProperty(k2)) {
        throw new Error(`Record is missing key "${k2}".`);
      }
      try {
        return t.covariant(x2[k2]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

field ${k2} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const values = this._fields.map(([key]) => x2[key]);
    const bufs = zipWith(this._fields, values, ([, c2], d2) => c2.encodeValue(d2));
    return concat(...bufs);
  }
  _buildTypeTableImpl(T2) {
    this._fields.forEach(([_2, value]) => value.buildTypeTable(T2));
    const opCode = slebEncode(IDLTypeIds.Record);
    const len = lebEncode(this._fields.length);
    const fields = this._fields.map(([key, value]) => concat(lebEncode(idlLabelToId(key)), value.encodeType(T2)));
    T2.add(this, concat(opCode, len, concat(...fields)));
  }
  decodeValue(b2, t) {
    const record = this.checkType(t);
    if (!(record instanceof RecordClass)) {
      throw new Error("Not a record type");
    }
    const x2 = {};
    let expectedRecordIdx = 0;
    let actualRecordIdx = 0;
    while (actualRecordIdx < record._fields.length) {
      const [hash, type] = record._fields[actualRecordIdx];
      if (expectedRecordIdx >= this._fields.length) {
        type.decodeValue(b2, type);
        actualRecordIdx++;
        continue;
      }
      const [expectKey, expectType] = this._fields[expectedRecordIdx];
      const expectedId = idlLabelToId(this._fields[expectedRecordIdx][0]);
      const actualId = idlLabelToId(hash);
      if (expectedId === actualId) {
        x2[expectKey] = expectType.decodeValue(b2, type);
        expectedRecordIdx++;
        actualRecordIdx++;
      } else if (actualId > expectedId) {
        if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
          x2[expectKey] = [];
          expectedRecordIdx++;
        } else {
          throw new Error("Cannot find required field " + expectKey);
        }
      } else {
        type.decodeValue(b2, type);
        actualRecordIdx++;
      }
    }
    for (const [expectKey, expectType] of this._fields.slice(expectedRecordIdx)) {
      if (expectType instanceof OptClass || expectType instanceof ReservedClass) {
        x2[expectKey] = [];
      } else {
        throw new Error("Cannot find required field " + expectKey);
      }
    }
    return x2;
  }
  get fieldsAsObject() {
    const fields = {};
    for (const [name, ty] of this._fields) {
      fields[idlLabelToId(name)] = ty;
    }
    return fields;
  }
  get name() {
    const fields = this._fields.map(([key, value]) => key + ":" + value.name);
    return `record {${fields.join("; ")}}`;
  }
  display() {
    const fields = this._fields.map(([key, value]) => key + ":" + value.display());
    return `record {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    const values = this._fields.map(([key]) => x2[key]);
    const fields = zipWith(this._fields, values, ([k2, c2], d2) => k2 + "=" + c2.valueToString(d2));
    return `record {${fields.join("; ")}}`;
  }
}
class TupleClass extends RecordClass {
  get typeName() {
    return IdlTypeName.TupleClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.TupleClass;
  }
  constructor(_components) {
    const x2 = {};
    _components.forEach((e, i) => x2["_" + i + "_"] = e);
    super(x2);
    this._components = _components;
  }
  accept(v2, d2) {
    return v2.visitTuple(this, this._components, d2);
  }
  covariant(x2) {
    if (Array.isArray(x2) && x2.length >= this._fields.length && this._components.every((t, i) => {
      try {
        return t.covariant(x2[i]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

index ${i} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const bufs = zipWith(this._components, x2, (c2, d2) => c2.encodeValue(d2));
    return concat(...bufs);
  }
  decodeValue(b2, t) {
    const tuple = this.checkType(t);
    if (!(tuple instanceof TupleClass)) {
      throw new Error("not a tuple type");
    }
    if (tuple._components.length < this._components.length) {
      throw new Error("tuple mismatch");
    }
    const res = [];
    for (const [i, wireType] of tuple._components.entries()) {
      if (i >= this._components.length) {
        wireType.decodeValue(b2, wireType);
      } else {
        res.push(this._components[i].decodeValue(b2, wireType));
      }
    }
    return res;
  }
  display() {
    const fields = this._components.map((value) => value.display());
    return `record {${fields.join("; ")}}`;
  }
  valueToString(values) {
    const fields = zipWith(this._components, values, (c2, d2) => c2.valueToString(d2));
    return `record {${fields.join("; ")}}`;
  }
}
class VariantClass extends ConstructType {
  get typeName() {
    return IdlTypeName.VariantClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.VariantClass;
  }
  constructor(fields = {}) {
    super();
    this._fields = Object.entries(fields).sort((a2, b2) => idlLabelToId(a2[0]) - idlLabelToId(b2[0]));
  }
  accept(v2, d2) {
    return v2.visitVariant(this, this._fields, d2);
  }
  covariant(x2) {
    if (typeof x2 === "object" && Object.entries(x2).length === 1 && this._fields.every(([k2, v2]) => {
      try {
        return !x2.hasOwnProperty(k2) || v2.covariant(x2[k2]);
      } catch (e) {
        throw new Error(`Invalid ${this.display()} argument: 

variant ${k2} -> ${e.message}`);
      }
    }))
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    for (let i = 0; i < this._fields.length; i++) {
      const [name, type] = this._fields[i];
      if (x2.hasOwnProperty(name)) {
        const idx = lebEncode(i);
        const buf = type.encodeValue(x2[name]);
        return concat(idx, buf);
      }
    }
    throw Error("Variant has no data: " + x2);
  }
  _buildTypeTableImpl(typeTable) {
    this._fields.forEach(([, type]) => {
      type.buildTypeTable(typeTable);
    });
    const opCode = slebEncode(IDLTypeIds.Variant);
    const len = lebEncode(this._fields.length);
    const fields = this._fields.map(([key, value]) => concat(lebEncode(idlLabelToId(key)), value.encodeType(typeTable)));
    typeTable.add(this, concat(opCode, len, ...fields));
  }
  decodeValue(b2, t) {
    const variant = this.checkType(t);
    if (!(variant instanceof VariantClass)) {
      throw new Error("Not a variant type");
    }
    const idx = Number(lebDecode(b2));
    if (idx >= variant._fields.length) {
      throw Error("Invalid variant index: " + idx);
    }
    const [wireHash, wireType] = variant._fields[idx];
    for (const [key, expectType] of this._fields) {
      if (idlLabelToId(wireHash) === idlLabelToId(key)) {
        const value = expectType.decodeValue(b2, wireType);
        return { [key]: value };
      }
    }
    throw new Error("Cannot find field hash " + wireHash);
  }
  get name() {
    const fields = this._fields.map(([key, type]) => key + ":" + type.name);
    return `variant {${fields.join("; ")}}`;
  }
  display() {
    const fields = this._fields.map(([key, type]) => key + (type.name === "null" ? "" : `:${type.display()}`));
    return `variant {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    for (const [name, type] of this._fields) {
      if (x2.hasOwnProperty(name)) {
        const value = type.valueToString(x2[name]);
        if (value === "null") {
          return `variant {${name}}`;
        } else {
          return `variant {${name}=${value}}`;
        }
      }
    }
    throw new Error("Variant has no data: " + x2);
  }
  get alternativesAsObject() {
    const alternatives = {};
    for (const [name, ty] of this._fields) {
      alternatives[idlLabelToId(name)] = ty;
    }
    return alternatives;
  }
}
const _RecClass = class _RecClass extends ConstructType {
  constructor() {
    super(...arguments);
    this._id = _RecClass._counter++;
  }
  get typeName() {
    return IdlTypeName.RecClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.RecClass;
  }
  accept(v2, d2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return v2.visitRec(this, this._type, d2);
  }
  fill(t) {
    this._type = t;
  }
  getType() {
    return this._type;
  }
  covariant(x2) {
    if (this._type ? this._type.covariant(x2) : false)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.encodeValue(x2);
  }
  _buildTypeTableImpl(typeTable) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    typeTable.add(this, new Uint8Array([]));
    this._type.buildTypeTable(typeTable);
    typeTable.merge(this, this._type.name);
  }
  decodeValue(b2, t) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.decodeValue(b2, t);
  }
  get name() {
    return `rec_${this._id}`;
  }
  display() {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return `μ${this.name}.${this._type.name}`;
  }
  valueToString(x2) {
    if (!this._type) {
      throw Error("Recursive type uninitialized.");
    }
    return this._type.valueToString(x2);
  }
};
_RecClass._counter = 0;
let RecClass = _RecClass;
function decodePrincipalId(b2) {
  const x2 = safeReadUint8(b2);
  if (x2 !== 1) {
    throw new Error("Cannot decode principal");
  }
  const len = Number(lebDecode(b2));
  return Principal$2.fromUint8Array(new Uint8Array(safeRead(b2, len)));
}
class PrincipalClass extends PrimitiveType {
  get typeName() {
    return IdlTypeName.PrincipalClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.PrincipalClass;
  }
  accept(v2, d2) {
    return v2.visitPrincipal(this, d2);
  }
  covariant(x2) {
    if (x2 && x2._isPrincipal)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = x2.toUint8Array();
    const len = lebEncode(buf.byteLength);
    return concat(new Uint8Array([1]), len, buf);
  }
  encodeType() {
    return slebEncode(IDLTypeIds.Principal);
  }
  decodeValue(b2, t) {
    this.checkType(t);
    return decodePrincipalId(b2);
  }
  get name() {
    return "principal";
  }
  valueToString(x2) {
    return `${this.name} "${x2.toText()}"`;
  }
}
class FuncClass extends ConstructType {
  get typeName() {
    return IdlTypeName.FuncClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.FuncClass;
  }
  static argsToString(types, v2) {
    if (types.length !== v2.length) {
      throw new Error("arity mismatch");
    }
    return "(" + types.map((t, i) => t.valueToString(v2[i])).join(", ") + ")";
  }
  constructor(argTypes, retTypes, annotations = []) {
    super();
    this.argTypes = argTypes;
    this.retTypes = retTypes;
    this.annotations = annotations;
  }
  accept(v2, d2) {
    return v2.visitFunc(this, d2);
  }
  covariant(x2) {
    if (Array.isArray(x2) && x2.length === 2 && x2[0] && x2[0]._isPrincipal && typeof x2[1] === "string")
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue([principal, methodName]) {
    const buf = principal.toUint8Array();
    const len = lebEncode(buf.byteLength);
    const canister = concat(new Uint8Array([1]), len, buf);
    const method = new TextEncoder().encode(methodName);
    const methodLen = lebEncode(method.byteLength);
    return concat(new Uint8Array([1]), canister, methodLen, method);
  }
  _buildTypeTableImpl(T2) {
    this.argTypes.forEach((arg) => arg.buildTypeTable(T2));
    this.retTypes.forEach((arg) => arg.buildTypeTable(T2));
    const opCode = slebEncode(IDLTypeIds.Func);
    const argLen = lebEncode(this.argTypes.length);
    const args = concat(...this.argTypes.map((arg) => arg.encodeType(T2)));
    const retLen = lebEncode(this.retTypes.length);
    const rets = concat(...this.retTypes.map((arg) => arg.encodeType(T2)));
    const annLen = lebEncode(this.annotations.length);
    const anns = concat(...this.annotations.map((a2) => this.encodeAnnotation(a2)));
    T2.add(this, concat(opCode, argLen, args, retLen, rets, annLen, anns));
  }
  decodeValue(b2, t) {
    const tt2 = t instanceof RecClass ? t.getType() ?? t : t;
    if (!subtype(tt2, this)) {
      throw new Error(`Cannot decode function reference at type ${this.display()} from wire type ${tt2.display()}`);
    }
    const x2 = safeReadUint8(b2);
    if (x2 !== 1) {
      throw new Error("Cannot decode function reference");
    }
    const canister = decodePrincipalId(b2);
    const mLen = Number(lebDecode(b2));
    const buf = safeRead(b2, mLen);
    const decoder = new TextDecoder("utf8", { fatal: true });
    const method = decoder.decode(buf);
    return [canister, method];
  }
  get name() {
    const args = this.argTypes.map((arg) => arg.name).join(", ");
    const rets = this.retTypes.map((arg) => arg.name).join(", ");
    const annon = " " + this.annotations.join(" ");
    return `(${args}) -> (${rets})${annon}`;
  }
  valueToString([principal, str]) {
    return `func "${principal.toText()}".${str}`;
  }
  display() {
    const args = this.argTypes.map((arg) => arg.display()).join(", ");
    const rets = this.retTypes.map((arg) => arg.display()).join(", ");
    const annon = " " + this.annotations.join(" ");
    return `(${args}) → (${rets})${annon}`;
  }
  encodeAnnotation(ann) {
    if (ann === "query") {
      return new Uint8Array([1]);
    } else if (ann === "oneway") {
      return new Uint8Array([2]);
    } else if (ann === "composite_query") {
      return new Uint8Array([3]);
    } else {
      throw new Error("Illegal function annotation");
    }
  }
}
class ServiceClass extends ConstructType {
  get typeName() {
    return IdlTypeName.ServiceClass;
  }
  static [Symbol.hasInstance](instance) {
    return instance.typeName === IdlTypeName.ServiceClass;
  }
  constructor(fields) {
    super();
    this._fields = Object.entries(fields).sort((a2, b2) => {
      if (a2[0] < b2[0]) {
        return -1;
      }
      if (a2[0] > b2[0]) {
        return 1;
      }
      return 0;
    });
  }
  accept(v2, d2) {
    return v2.visitService(this, d2);
  }
  covariant(x2) {
    if (x2 && x2._isPrincipal)
      return true;
    throw new Error(`Invalid ${this.display()} argument: ${toReadableString(x2)}`);
  }
  encodeValue(x2) {
    const buf = x2.toUint8Array();
    const len = lebEncode(buf.length);
    return concat(new Uint8Array([1]), len, buf);
  }
  _buildTypeTableImpl(T2) {
    this._fields.forEach(([_2, func]) => func.buildTypeTable(T2));
    const opCode = slebEncode(IDLTypeIds.Service);
    const len = lebEncode(this._fields.length);
    const meths = this._fields.map(([label, func]) => {
      const labelBuf = new TextEncoder().encode(label);
      const labelLen = lebEncode(labelBuf.length);
      return concat(labelLen, labelBuf, func.encodeType(T2));
    });
    T2.add(this, concat(opCode, len, ...meths));
  }
  decodeValue(b2, t) {
    const tt2 = t instanceof RecClass ? t.getType() ?? t : t;
    if (!subtype(tt2, this)) {
      throw new Error(`Cannot decode service reference at type ${this.display()} from wire type ${tt2.display()}`);
    }
    return decodePrincipalId(b2);
  }
  get name() {
    const fields = this._fields.map(([key, value]) => key + ":" + value.name);
    return `service {${fields.join("; ")}}`;
  }
  valueToString(x2) {
    return `service "${x2.toText()}"`;
  }
  fieldsAsObject() {
    const fields = {};
    for (const [name, ty] of this._fields) {
      fields[name] = ty;
    }
    return fields;
  }
}
function toReadableString(x2) {
  const str = JSON.stringify(x2, (_key, value) => typeof value === "bigint" ? `BigInt(${value})` : value);
  return str && str.length > toReadableString_max ? str.substring(0, toReadableString_max - 3) + "..." : str;
}
function encode$1(argTypes, args) {
  if (args.length < argTypes.length) {
    throw Error("Wrong number of message arguments");
  }
  const typeTable = new TypeTable();
  argTypes.forEach((t) => t.buildTypeTable(typeTable));
  const magic = new TextEncoder().encode(magicNumber);
  const table = typeTable.encode();
  const len = lebEncode(args.length);
  const typs = concat(...argTypes.map((t) => t.encodeType(typeTable)));
  const vals = concat(...zipWith(argTypes, args, (t, x2) => {
    try {
      t.covariant(x2);
    } catch (e) {
      const err = new Error(e.message + "\n\n");
      throw err;
    }
    return t.encodeValue(x2);
  }));
  return concat(magic, table, len, typs, vals);
}
function decode$1(retTypes, bytes) {
  const b2 = new PipeArrayBuffer(bytes);
  if (bytes.byteLength < magicNumber.length) {
    throw new Error("Message length smaller than magic number");
  }
  const magicBuffer = safeRead(b2, magicNumber.length);
  const magic = new TextDecoder().decode(magicBuffer);
  if (magic !== magicNumber) {
    throw new Error("Wrong magic number: " + JSON.stringify(magic));
  }
  function readTypeTable(pipe) {
    const typeTable = [];
    const len = Number(lebDecode(pipe));
    for (let i = 0; i < len; i++) {
      const ty = Number(slebDecode(pipe));
      switch (ty) {
        case IDLTypeIds.Opt:
        case IDLTypeIds.Vector: {
          const t = Number(slebDecode(pipe));
          typeTable.push([ty, t]);
          break;
        }
        case IDLTypeIds.Record:
        case IDLTypeIds.Variant: {
          const fields = [];
          let objectLength = Number(lebDecode(pipe));
          let prevHash;
          while (objectLength--) {
            const hash = Number(lebDecode(pipe));
            if (hash >= Math.pow(2, 32)) {
              throw new Error("field id out of 32-bit range");
            }
            if (typeof prevHash === "number" && prevHash >= hash) {
              throw new Error("field id collision or not sorted");
            }
            prevHash = hash;
            const t = Number(slebDecode(pipe));
            fields.push([hash, t]);
          }
          typeTable.push([ty, fields]);
          break;
        }
        case IDLTypeIds.Func: {
          const args = [];
          let argLength = Number(lebDecode(pipe));
          while (argLength--) {
            args.push(Number(slebDecode(pipe)));
          }
          const returnValues = [];
          let returnValuesLength = Number(lebDecode(pipe));
          while (returnValuesLength--) {
            returnValues.push(Number(slebDecode(pipe)));
          }
          const annotations = [];
          let annotationLength = Number(lebDecode(pipe));
          while (annotationLength--) {
            const annotation = Number(lebDecode(pipe));
            switch (annotation) {
              case 1: {
                annotations.push("query");
                break;
              }
              case 2: {
                annotations.push("oneway");
                break;
              }
              case 3: {
                annotations.push("composite_query");
                break;
              }
              default:
                throw new Error("unknown annotation");
            }
          }
          typeTable.push([ty, [args, returnValues, annotations]]);
          break;
        }
        case IDLTypeIds.Service: {
          let servLength = Number(lebDecode(pipe));
          const methods = [];
          while (servLength--) {
            const nameLength = Number(lebDecode(pipe));
            const funcName = new TextDecoder().decode(safeRead(pipe, nameLength));
            const funcType = slebDecode(pipe);
            methods.push([funcName, funcType]);
          }
          typeTable.push([ty, methods]);
          break;
        }
        default:
          throw new Error("Illegal op_code: " + ty);
      }
    }
    const rawList = [];
    const length = Number(lebDecode(pipe));
    for (let i = 0; i < length; i++) {
      rawList.push(Number(slebDecode(pipe)));
    }
    return [typeTable, rawList];
  }
  const [rawTable, rawTypes] = readTypeTable(b2);
  if (rawTypes.length < retTypes.length) {
    throw new Error("Wrong number of return values");
  }
  const table = rawTable.map((_2) => Rec());
  function getType(t) {
    if (t < -24) {
      throw new Error("future value not supported");
    }
    if (t < 0) {
      switch (t) {
        case -1:
          return Null;
        case -2:
          return Bool;
        case -3:
          return Nat;
        case -4:
          return Int;
        case -5:
          return Nat8;
        case -6:
          return Nat16;
        case -7:
          return Nat32;
        case -8:
          return Nat64;
        case -9:
          return Int8;
        case -10:
          return Int16;
        case -11:
          return Int32;
        case -12:
          return Int64;
        case -13:
          return Float32;
        case -14:
          return Float64;
        case -15:
          return Text;
        case -16:
          return Reserved;
        case -17:
          return Empty;
        case -24:
          return Principal$1;
        default:
          throw new Error("Illegal op_code: " + t);
      }
    }
    if (t >= rawTable.length) {
      throw new Error("type index out of range");
    }
    return table[t];
  }
  function buildType(entry) {
    switch (entry[0]) {
      case IDLTypeIds.Vector: {
        const ty = getType(entry[1]);
        return Vec(ty);
      }
      case IDLTypeIds.Opt: {
        const ty = getType(entry[1]);
        return Opt(ty);
      }
      case IDLTypeIds.Record: {
        const fields = {};
        for (const [hash, ty] of entry[1]) {
          const name = `_${hash}_`;
          fields[name] = getType(ty);
        }
        const record = Record(fields);
        const tuple = record.tryAsTuple();
        if (Array.isArray(tuple)) {
          return Tuple(...tuple);
        } else {
          return record;
        }
      }
      case IDLTypeIds.Variant: {
        const fields = {};
        for (const [hash, ty] of entry[1]) {
          const name = `_${hash}_`;
          fields[name] = getType(ty);
        }
        return Variant(fields);
      }
      case IDLTypeIds.Func: {
        const [args, returnValues, annotations] = entry[1];
        return Func(args.map((t) => getType(t)), returnValues.map((t) => getType(t)), annotations);
      }
      case IDLTypeIds.Service: {
        const rec = {};
        const methods = entry[1];
        for (const [name, typeRef] of methods) {
          let type = getType(typeRef);
          if (type instanceof RecClass) {
            type = type.getType();
          }
          if (!(type instanceof FuncClass)) {
            throw new Error("Illegal service definition: services can only contain functions");
          }
          rec[name] = type;
        }
        return Service(rec);
      }
      default:
        throw new Error("Illegal op_code: " + entry[0]);
    }
  }
  rawTable.forEach((entry, i) => {
    if (entry[0] === IDLTypeIds.Func) {
      const t = buildType(entry);
      table[i].fill(t);
    }
  });
  rawTable.forEach((entry, i) => {
    if (entry[0] !== IDLTypeIds.Func) {
      const t = buildType(entry);
      table[i].fill(t);
    }
  });
  resetSubtypeCache();
  const types = rawTypes.map((t) => getType(t));
  try {
    const output = retTypes.map((t, i) => {
      return t.decodeValue(b2, types[i]);
    });
    for (let ind = retTypes.length; ind < types.length; ind++) {
      types[ind].decodeValue(b2, types[ind]);
    }
    if (b2.byteLength > 0) {
      throw new Error("decode: Left-over bytes");
    }
    return output;
  } finally {
    resetSubtypeCache();
  }
}
const Empty = new EmptyClass();
const Reserved = new ReservedClass();
const Unknown = new UnknownClass();
const Bool = new BoolClass();
const Null = new NullClass();
const Text = new TextClass();
const Int = new IntClass();
const Nat = new NatClass();
const Float32 = new FloatClass(32);
const Float64 = new FloatClass(64);
const Int8 = new FixedIntClass(8);
const Int16 = new FixedIntClass(16);
const Int32 = new FixedIntClass(32);
const Int64 = new FixedIntClass(64);
const Nat8 = new FixedNatClass(8);
const Nat16 = new FixedNatClass(16);
const Nat32 = new FixedNatClass(32);
const Nat64 = new FixedNatClass(64);
const Principal$1 = new PrincipalClass();
function Tuple(...types) {
  return new TupleClass(types);
}
function Vec(t) {
  return new VecClass(t);
}
function Opt(t) {
  return new OptClass(t);
}
function Record(t) {
  return new RecordClass(t);
}
function Variant(fields) {
  return new VariantClass(fields);
}
function Rec() {
  return new RecClass();
}
function Func(args, ret, annotations = []) {
  return new FuncClass(args, ret, annotations);
}
function Service(t) {
  return new ServiceClass(t);
}
class Relations {
  constructor(relations = /* @__PURE__ */ new Map()) {
    this.rels = relations;
  }
  copy() {
    const copy = /* @__PURE__ */ new Map();
    for (const [key, value] of this.rels.entries()) {
      const valCopy = new Map(value);
      copy.set(key, valCopy);
    }
    return new Relations(copy);
  }
  /// Returns whether we know for sure that a relation holds or doesn't (`true` or `false`), or
  /// if we don't know yet (`undefined`)
  known(t1, t2) {
    var _a2;
    return (_a2 = this.rels.get(t1.name)) == null ? void 0 : _a2.get(t2.name);
  }
  addNegative(t1, t2) {
    this.addNames(t1.name, t2.name, false);
  }
  add(t1, t2) {
    this.addNames(t1.name, t2.name, true);
  }
  display() {
    let result = "";
    for (const [t1, v2] of this.rels) {
      for (const [t2, known] of v2) {
        const subty = known ? ":<" : "!<:";
        result += `${t1} ${subty} ${t2}
`;
      }
    }
    return result;
  }
  addNames(t1, t2, isSubtype) {
    const t1Map = this.rels.get(t1);
    if (t1Map == void 0) {
      const newMap = /* @__PURE__ */ new Map();
      newMap.set(t2, isSubtype);
      this.rels.set(t1, newMap);
    } else {
      t1Map.set(t2, isSubtype);
    }
  }
}
let subtypeCache = new Relations();
function resetSubtypeCache() {
  subtypeCache = new Relations();
}
function eqFunctionAnnotations(t1, t2) {
  const t1Annotations = new Set(t1.annotations);
  const t2Annotations = new Set(t2.annotations);
  if (t1Annotations.size !== t2Annotations.size) {
    return false;
  }
  for (const a2 of t1Annotations) {
    if (!t2Annotations.has(a2))
      return false;
  }
  return true;
}
function canBeOmmitted(t) {
  return t instanceof OptClass || t instanceof NullClass || t instanceof ReservedClass;
}
function subtype(t1, t2) {
  const relations = subtypeCache.copy();
  const isSubtype = subtype_(relations, t1, t2);
  if (isSubtype) {
    subtypeCache.add(t1, t2);
  } else {
    subtypeCache.addNegative(t1, t2);
  }
  return isSubtype;
}
function subtype_(relations, t1, t2) {
  if (t1.name === t2.name)
    return true;
  const known = relations.known(t1, t2);
  if (known !== void 0)
    return known;
  relations.add(t1, t2);
  if (t2 instanceof ReservedClass)
    return true;
  if (t1 instanceof EmptyClass)
    return true;
  if (t1 instanceof NatClass && t2 instanceof IntClass)
    return true;
  if (t1 instanceof VecClass && t2 instanceof VecClass)
    return subtype_(relations, t1._type, t2._type);
  if (t2 instanceof OptClass)
    return true;
  if (t1 instanceof RecordClass && t2 instanceof RecordClass) {
    const t1Object = t1.fieldsAsObject;
    for (const [label, ty2] of t2._fields) {
      const ty1 = t1Object[idlLabelToId(label)];
      if (!ty1) {
        if (!canBeOmmitted(ty2))
          return false;
      } else {
        if (!subtype_(relations, ty1, ty2))
          return false;
      }
    }
    return true;
  }
  if (t1 instanceof FuncClass && t2 instanceof FuncClass) {
    if (!eqFunctionAnnotations(t1, t2))
      return false;
    for (let i = 0; i < t1.argTypes.length; i++) {
      const argTy1 = t1.argTypes[i];
      if (i < t2.argTypes.length) {
        if (!subtype_(relations, t2.argTypes[i], argTy1))
          return false;
      } else {
        if (!canBeOmmitted(argTy1))
          return false;
      }
    }
    for (let i = 0; i < t2.retTypes.length; i++) {
      const retTy2 = t2.retTypes[i];
      if (i < t1.retTypes.length) {
        if (!subtype_(relations, t1.retTypes[i], retTy2))
          return false;
      } else {
        if (!canBeOmmitted(retTy2))
          return false;
      }
    }
    return true;
  }
  if (t1 instanceof VariantClass && t2 instanceof VariantClass) {
    const t2Object = t2.alternativesAsObject;
    for (const [label, ty1] of t1._fields) {
      const ty2 = t2Object[idlLabelToId(label)];
      if (!ty2)
        return false;
      if (!subtype_(relations, ty1, ty2))
        return false;
    }
    return true;
  }
  if (t1 instanceof ServiceClass && t2 instanceof ServiceClass) {
    const t1Object = t1.fieldsAsObject();
    for (const [name, ty2] of t2._fields) {
      const ty1 = t1Object[name];
      if (!ty1)
        return false;
      if (!subtype_(relations, ty1, ty2))
        return false;
    }
    return true;
  }
  if (t1 instanceof RecClass) {
    return subtype_(relations, t1.getType(), t2);
  }
  if (t2 instanceof RecClass) {
    return subtype_(relations, t1, t2.getType());
  }
  return false;
}
const IDL = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Bool,
  BoolClass,
  ConstructType,
  Empty,
  EmptyClass,
  FixedIntClass,
  FixedNatClass,
  Float32,
  Float64,
  FloatClass,
  Func,
  FuncClass,
  Int,
  Int16,
  Int32,
  Int64,
  Int8,
  IntClass,
  Nat,
  Nat16,
  Nat32,
  Nat64,
  Nat8,
  NatClass,
  Null,
  NullClass,
  Opt,
  OptClass,
  PrimitiveType,
  Principal: Principal$1,
  PrincipalClass,
  Rec,
  RecClass,
  Record,
  RecordClass,
  Reserved,
  ReservedClass,
  Service,
  ServiceClass,
  Text,
  TextClass,
  Tuple,
  TupleClass,
  Type,
  Unknown,
  UnknownClass,
  Variant,
  VariantClass,
  Vec,
  VecClass,
  Visitor,
  decode: decode$1,
  encode: encode$1,
  resetSubtypeCache,
  subtype
}, Symbol.toStringTag, { value: "Module" }));
function uint8FromBufLike(bufLike) {
  if (!bufLike) {
    throw new Error("Input cannot be null or undefined");
  }
  if (bufLike instanceof Uint8Array) {
    return bufLike;
  }
  if (bufLike instanceof ArrayBuffer) {
    return new Uint8Array(bufLike);
  }
  if (Array.isArray(bufLike)) {
    return new Uint8Array(bufLike);
  }
  if ("buffer" in bufLike) {
    return uint8FromBufLike(bufLike.buffer);
  }
  return new Uint8Array(bufLike);
}
function uint8Equals(a2, b2) {
  if (a2.length !== b2.length)
    return false;
  for (let i = 0; i < a2.length; i++) {
    if (a2[i] !== b2[i])
      return false;
  }
  return true;
}
function hashValue(value) {
  if (typeof value === "string") {
    return hashString(value);
  } else if (typeof value === "number") {
    return sha256(lebEncode(value));
  } else if (value instanceof Uint8Array || ArrayBuffer.isView(value)) {
    return sha256(uint8FromBufLike(value));
  } else if (Array.isArray(value)) {
    const vals = value.map(hashValue);
    return sha256(concatBytes(...vals));
  } else if (value && typeof value === "object" && value._isPrincipal) {
    return sha256(value.toUint8Array());
  } else if (typeof value === "object" && value !== null && typeof value.toHash === "function") {
    return hashValue(value.toHash());
  } else if (typeof value === "object") {
    return hashOfMap(value);
  } else if (typeof value === "bigint") {
    return sha256(lebEncode(value));
  }
  throw InputError.fromCode(new HashValueErrorCode(value));
}
const hashString = (value) => {
  const encoded = new TextEncoder().encode(value);
  return sha256(encoded);
};
function requestIdOf(request2) {
  return hashOfMap(request2);
}
function hashOfMap(map) {
  const hashed = Object.entries(map).filter(([, value]) => value !== void 0).map(([key, value]) => {
    const hashedKey = hashString(key);
    const hashedValue = hashValue(value);
    return [hashedKey, hashedValue];
  });
  const traversed = hashed;
  const sorted = traversed.sort(([k1], [k2]) => {
    return compare(k1, k2);
  });
  const concatenated = concatBytes(...sorted.map((x2) => concatBytes(...x2)));
  const result = sha256(concatenated);
  return result;
}
new TextEncoder().encode("\nic-request");
const IC_RESPONSE_DOMAIN_SEPARATOR = new TextEncoder().encode("\vic-response");
new TextEncoder().encode("ic-request-auth-delegation");
class AnonymousIdentity {
  getPrincipal() {
    return Principal$2.anonymous();
  }
  async transformRequest(request2) {
    return {
      ...request2,
      body: { content: request2.body }
    };
  }
}
class w extends Error {
  constructor(n) {
    super(n), this.name = "DecodingError";
  }
}
const m = 55799, L = Symbol("CBOR_STOP_CODE");
var g = /* @__PURE__ */ ((t) => (t[t.False = 20] = "False", t[t.True = 21] = "True", t[t.Null = 22] = "Null", t[t.Undefined = 23] = "Undefined", t[t.Break = 31] = "Break", t))(g || {}), c = /* @__PURE__ */ ((t) => (t[t.UnsignedInteger = 0] = "UnsignedInteger", t[t.NegativeInteger = 1] = "NegativeInteger", t[t.ByteString = 2] = "ByteString", t[t.TextString = 3] = "TextString", t[t.Array = 4] = "Array", t[t.Map = 5] = "Map", t[t.Tag = 6] = "Tag", t[t.Simple = 7] = "Simple", t))(c || {});
const z = 23, Y = 255, G = 65535, P = 4294967295, H = BigInt("0xffffffffffffffff");
var d = /* @__PURE__ */ ((t) => (t[t.Value = 23] = "Value", t[t.OneByte = 24] = "OneByte", t[t.TwoBytes = 25] = "TwoBytes", t[t.FourBytes = 26] = "FourBytes", t[t.EightBytes = 27] = "EightBytes", t[t.Indefinite = 31] = "Indefinite", t))(d || {});
const h = false;
function W(t) {
  return t == null;
}
function R(t, n) {
  const e = new Uint8Array(n);
  return e.set(t), e;
}
const K = new TextDecoder();
function Z(t) {
  return (t & 224) >> 5;
}
function q(t) {
  return t & 31;
}
let A = new Uint8Array(), y, a = 0;
function ut(t, n) {
  A = t, a = 0;
  const e = B();
  return (n == null ? void 0 : n(e)) ?? e;
}
function B(t) {
  const [n, e] = N();
  switch (n) {
    case c.UnsignedInteger:
      return E(e);
    case c.NegativeInteger:
      return j(e);
    case c.ByteString:
      return $(e);
    case c.TextString:
      return F(e);
    case c.Array:
      return J(e);
    case c.Map:
      return b(e);
    case c.Tag:
      return M(e);
    case c.Simple:
      return Q(e);
  }
  throw new w(`Unsupported major type: ${n}`);
}
function N() {
  const t = A.at(a);
  if (W(t))
    throw new w("Provided CBOR data is empty");
  const n = Z(t), e = q(t);
  return a++, [n, e];
}
function J(t, n) {
  const e = E(t);
  if (e === 1 / 0) {
    const u = [];
    let f = B();
    for (; f !== L; )
      u.push(f), f = B();
    return u;
  }
  const i = new Array(e);
  for (let u = 0; u < e; u++) {
    const f = B();
    i[u] = f;
  }
  return i;
}
function Q(t) {
  switch (t) {
    case g.False:
      return false;
    case g.True:
      return true;
    case g.Null:
      return null;
    case g.Undefined:
      return;
    case g.Break:
      return L;
  }
  throw new w(`Unrecognized simple type: ${t.toString(2)}`);
}
function b(t, n) {
  const e = E(t), i = {};
  if (e === 1 / 0) {
    let [u, f] = N();
    for (; u !== c.Simple && f !== g.Break; ) {
      const l = F(f), U = B();
      i[l] = U, [u, f] = N();
    }
    return i;
  }
  for (let u = 0; u < e; u++) {
    const [f, l] = N();
    if (f !== c.TextString)
      throw new w("Map keys must be text strings");
    const U = F(l), D = B();
    i[U] = D;
  }
  return i;
}
function E(t) {
  if (t <= d.Value)
    return t;
  switch (y = new DataView(A.buffer, A.byteOffset + a), t) {
    case d.OneByte:
      return a++, y.getUint8(0);
    case d.TwoBytes:
      return a += 2, y.getUint16(0, h);
    case d.FourBytes:
      return a += 4, y.getUint32(0, h);
    case d.EightBytes:
      return a += 8, y.getBigUint64(0, h);
    case d.Indefinite:
      return 1 / 0;
    default:
      throw new w(`Unsupported integer info: ${t.toString(2)}`);
  }
}
function j(t) {
  const n = E(t);
  return typeof n == "number" ? -1 - n : -1n - n;
}
function $(t) {
  const n = E(t);
  if (n > Number.MAX_SAFE_INTEGER)
    throw new w("Byte length is too large");
  const e = Number(n);
  return a += e, A.slice(a - e, a);
}
function F(t) {
  const n = $(t);
  return K.decode(n);
}
function M(t, n) {
  const e = E(t);
  if (e === m)
    return B();
  throw new w(`Unsupported tag: ${e}.`);
}
class x extends Error {
  constructor(n) {
    super(n), this.name = "SerializationError";
  }
}
const p = 2 * 1024, C = 100, v = new TextEncoder();
function S(t) {
  return t << 5;
}
let o = new Uint8Array(p), r = new DataView(o.buffer), s = 0, O = [];
function dt(t, n) {
  s = 0;
  const e = (n == null ? void 0 : n(t)) ?? t;
  return it(m, e, n), o.slice(0, s);
}
function _(t, n) {
  if (s > o.length - C && (o = R(o, o.length * 2), r = new DataView(o.buffer)), t === false || t === true || t === null || t === void 0) {
    et(t);
    return;
  }
  if (typeof t == "number" || typeof t == "bigint") {
    ft(t);
    return;
  }
  if (typeof t == "string") {
    X(t);
    return;
  }
  if (t instanceof Uint8Array) {
    V(t);
    return;
  }
  if (t instanceof ArrayBuffer) {
    V(new Uint8Array(t));
    return;
  }
  if (Array.isArray(t)) {
    tt(t, n);
    return;
  }
  if (typeof t == "object") {
    nt(t, n);
    return;
  }
  throw new x(`Unsupported type: ${typeof t}`);
}
function tt(t, n) {
  I(c.Array, t.length), t.forEach((e, i) => {
    _((n == null ? void 0 : n(e, i.toString())) ?? e, n);
  });
}
function nt(t, n) {
  O = Object.entries(t), I(c.Map, O.length), O.forEach(([e, i]) => {
    X(e), _((n == null ? void 0 : n(i, e)) ?? i, n);
  });
}
function I(t, n) {
  if (n <= z) {
    r.setUint8(
      s++,
      S(t) | Number(n)
    );
    return;
  }
  if (n <= Y) {
    r.setUint8(
      s++,
      S(t) | d.OneByte
    ), r.setUint8(s, Number(n)), s += 1;
    return;
  }
  if (n <= G) {
    r.setUint8(
      s++,
      S(t) | d.TwoBytes
    ), r.setUint16(s, Number(n), h), s += 2;
    return;
  }
  if (n <= P) {
    r.setUint8(
      s++,
      S(t) | d.FourBytes
    ), r.setUint32(s, Number(n), h), s += 4;
    return;
  }
  if (n <= H) {
    r.setUint8(
      s++,
      S(t) | d.EightBytes
    ), r.setBigUint64(s, BigInt(n), h), s += 8;
    return;
  }
  throw new x(`Value too large to encode: ${n}`);
}
function et(t) {
  I(c.Simple, st(t));
}
function st(t) {
  if (t === false)
    return g.False;
  if (t === true)
    return g.True;
  if (t === null)
    return g.Null;
  if (t === void 0)
    return g.Undefined;
  throw new x(`Unrecognized simple value: ${t.toString()}`);
}
function k(t, n) {
  I(t, n.length), s > o.length - n.length && (o = R(o, o.length + n.length), r = new DataView(o.buffer)), o.set(n, s), s += n.length;
}
function T(t, n) {
  I(t, n);
}
function ct(t) {
  T(c.UnsignedInteger, t);
}
function ot(t) {
  T(
    c.NegativeInteger,
    typeof t == "bigint" ? -1n - t : -1 - t
  );
}
function ft(t) {
  t >= 0 ? ct(t) : ot(t);
}
function X(t) {
  k(c.TextString, v.encode(t));
}
function V(t) {
  k(c.ByteString, t);
}
function it(t, n, e) {
  I(c.Tag, t), _(n, e);
}
function hasCborValueMethod(value) {
  return typeof value === "object" && value !== null && "toCborValue" in value;
}
function encode(value) {
  try {
    return dt(value, (value2) => {
      if (Principal$2.isPrincipal(value2)) {
        return value2.toUint8Array();
      }
      if (Expiry.isExpiry(value2)) {
        return value2.toBigInt();
      }
      if (hasCborValueMethod(value2)) {
        return value2.toCborValue();
      }
      return value2;
    });
  } catch (error) {
    throw InputError.fromCode(new CborEncodeErrorCode(error, value));
  }
}
function decode(input) {
  try {
    return ut(input);
  } catch (error) {
    throw InputError.fromCode(new CborDecodeErrorCode(error, input));
  }
}
const randomNumber = () => {
  if (typeof window !== "undefined" && !!window.crypto && !!window.crypto.getRandomValues) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0];
  }
  if (typeof crypto !== "undefined" && crypto.randomInt) {
    return crypto.randomInt(0, 4294967295);
  }
  return Math.floor(Math.random() * 4294967295);
};
var Endpoint;
(function(Endpoint2) {
  Endpoint2["Query"] = "read";
  Endpoint2["ReadState"] = "read_state";
  Endpoint2["Call"] = "call";
})(Endpoint || (Endpoint = {}));
var SubmitRequestType;
(function(SubmitRequestType2) {
  SubmitRequestType2["Call"] = "call";
})(SubmitRequestType || (SubmitRequestType = {}));
var ReadRequestType;
(function(ReadRequestType2) {
  ReadRequestType2["Query"] = "query";
  ReadRequestType2["ReadState"] = "read_state";
})(ReadRequestType || (ReadRequestType = {}));
function makeNonce() {
  const buffer = new ArrayBuffer(16);
  const view = new DataView(buffer);
  const rand1 = randomNumber();
  const rand2 = randomNumber();
  const rand3 = randomNumber();
  const rand4 = randomNumber();
  view.setUint32(0, rand1);
  view.setUint32(4, rand2);
  view.setUint32(8, rand3);
  view.setUint32(12, rand4);
  return Object.assign(new Uint8Array(buffer), { __nonce__: void 0 });
}
const JSON_KEY_EXPIRY = "__expiry__";
const SECONDS_TO_MILLISECONDS = BigInt(1e3);
const MILLISECONDS_TO_NANOSECONDS = BigInt(1e6);
const MINUTES_TO_SECONDS = BigInt(60);
const EXPIRY_DELTA_THRESHOLD_MILLISECONDS = BigInt(90) * SECONDS_TO_MILLISECONDS;
function roundMillisToSeconds(millis) {
  return millis / SECONDS_TO_MILLISECONDS;
}
function roundMillisToMinutes(millis) {
  return roundMillisToSeconds(millis) / MINUTES_TO_SECONDS;
}
class Expiry {
  constructor(__expiry__) {
    this.__expiry__ = __expiry__;
    this._isExpiry = true;
  }
  /**
   * Creates an Expiry object from a delta in milliseconds.
   * If the delta is less than 90 seconds, the expiry is rounded down to the nearest second.
   * Otherwise, the expiry is rounded down to the nearest minute.
   * @param deltaInMs The milliseconds to add to the current time.
   * @param clockDriftMs The milliseconds to add to the current time, typically the clock drift between IC network clock and the client's clock. Defaults to `0` if not provided.
   * @returns {Expiry} The constructed Expiry object.
   */
  static fromDeltaInMilliseconds(deltaInMs, clockDriftMs = 0) {
    const deltaMs = BigInt(deltaInMs);
    const expiryMs = BigInt(Date.now()) + deltaMs + BigInt(clockDriftMs);
    let roundedExpirySeconds;
    if (deltaMs < EXPIRY_DELTA_THRESHOLD_MILLISECONDS) {
      roundedExpirySeconds = roundMillisToSeconds(expiryMs);
    } else {
      const roundedExpiryMinutes = roundMillisToMinutes(expiryMs);
      roundedExpirySeconds = roundedExpiryMinutes * MINUTES_TO_SECONDS;
    }
    return new Expiry(roundedExpirySeconds * SECONDS_TO_MILLISECONDS * MILLISECONDS_TO_NANOSECONDS);
  }
  toBigInt() {
    return this.__expiry__;
  }
  toHash() {
    return lebEncode(this.__expiry__);
  }
  toString() {
    return this.__expiry__.toString();
  }
  /**
   * Serializes to JSON
   * @returns {JsonnableExpiry} a JSON object with a single key, {@link JSON_KEY_EXPIRY}, whose value is the expiry as a string
   */
  toJSON() {
    return { [JSON_KEY_EXPIRY]: this.toString() };
  }
  /**
   * Deserializes a {@link JsonnableExpiry} object from a JSON string.
   * @param input The JSON string to deserialize.
   * @returns {Expiry} The deserialized Expiry object.
   */
  static fromJSON(input) {
    const obj = JSON.parse(input);
    if (obj[JSON_KEY_EXPIRY]) {
      try {
        const expiry = BigInt(obj[JSON_KEY_EXPIRY]);
        return new Expiry(expiry);
      } catch (error) {
        throw new InputError(new ExpiryJsonDeserializeErrorCode(`Not a valid BigInt: ${error}`));
      }
    }
    throw new InputError(new ExpiryJsonDeserializeErrorCode(`The input does not contain the key ${JSON_KEY_EXPIRY}`));
  }
  static isExpiry(other) {
    return other instanceof Expiry || typeof other === "object" && other !== null && "_isExpiry" in other && other["_isExpiry"] === true && "__expiry__" in other && typeof other["__expiry__"] === "bigint";
  }
}
function makeNonceTransform(nonceFn = makeNonce) {
  return async (request2) => {
    const headers = request2.request.headers;
    request2.request.headers = headers;
    if (request2.endpoint === Endpoint.Call) {
      request2.body.nonce = nonceFn();
    }
  };
}
function httpHeadersTransform(headers) {
  const headerFields = [];
  headers.forEach((value, key) => {
    headerFields.push([key, value]);
  });
  return headerFields;
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$7 = /* @__PURE__ */ BigInt(0);
const _1n$8 = /* @__PURE__ */ BigInt(1);
function _abool2(value, title = "") {
  if (typeof value !== "boolean") {
    const prefix = title && `"${title}"`;
    throw new Error(prefix + "expected boolean, got type=" + typeof value);
  }
  return value;
}
function _abytes2(value, length, title = "") {
  const bytes = isBytes(value);
  const len = value == null ? void 0 : value.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    throw new Error(prefix + "expected Uint8Array" + ofLen + ", got " + got);
  }
  return value;
}
function hexToNumber(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n$7 : BigInt("0x" + hex);
}
function bytesToNumberBE(bytes) {
  return hexToNumber(bytesToHex(bytes));
}
function bytesToNumberLE(bytes) {
  abytes(bytes);
  return hexToNumber(bytesToHex(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n, len) {
  return hexToBytes(n.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n, len) {
  return numberToBytesBE(n, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function copyBytes(bytes) {
  return Uint8Array.from(bytes);
}
const isPosBig = (n) => typeof n === "bigint" && _0n$7 <= n;
function inRange(n, min, max) {
  return isPosBig(n) && isPosBig(min) && isPosBig(max) && min <= n && n < max;
}
function aInRange(title, n, min, max) {
  if (!inRange(n, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n);
}
function bitLen(n) {
  let len;
  for (len = 0; n > _0n$7; n >>= _1n$8, len += 1)
    ;
  return len;
}
function bitGet(n, pos) {
  return n >> BigInt(pos) & _1n$8;
}
const bitMask = (n) => (_1n$8 << BigInt(n)) - _1n$8;
function isHash(val) {
  return typeof val === "function" && Number.isSafeInteger(val.outputLen);
}
function _validateObject(object, fields, optFields = {}) {
  if (!object || typeof object !== "object")
    throw new Error("expected valid options object");
  function checkField(fieldName, expectedType, isOpt) {
    const val = object[fieldName];
    if (isOpt && val === void 0)
      return;
    const current = typeof val;
    if (current !== expectedType || val === null)
      throw new Error(`param "${fieldName}" is invalid: expected ${expectedType}, got ${current}`);
  }
  Object.entries(fields).forEach(([k2, v2]) => checkField(k2, v2, false));
  Object.entries(optFields).forEach(([k2, v2]) => checkField(k2, v2, true));
}
const notImplemented = () => {
  throw new Error("not implemented");
};
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$6 = BigInt(0), _1n$7 = BigInt(1), _2n$6 = /* @__PURE__ */ BigInt(2), _3n$4 = /* @__PURE__ */ BigInt(3);
const _4n$2 = /* @__PURE__ */ BigInt(4), _5n$1 = /* @__PURE__ */ BigInt(5), _7n = /* @__PURE__ */ BigInt(7);
const _8n$2 = /* @__PURE__ */ BigInt(8), _9n = /* @__PURE__ */ BigInt(9), _16n = /* @__PURE__ */ BigInt(16);
function mod(a2, b2) {
  const result = a2 % b2;
  return result >= _0n$6 ? result : b2 + result;
}
function pow2(x2, power, modulo) {
  let res = x2;
  while (power-- > _0n$6) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n$6)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n$6)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a2 = mod(number, modulo);
  let b2 = modulo;
  let x2 = _0n$6, u = _1n$7;
  while (a2 !== _0n$6) {
    const q2 = b2 / a2;
    const r2 = b2 % a2;
    const m2 = x2 - u * q2;
    b2 = a2, a2 = r2, x2 = u, u = m2;
  }
  const gcd = b2;
  if (gcd !== _1n$7)
    throw new Error("invert: does not exist");
  return mod(x2, modulo);
}
function assertIsSquare(Fp3, root, n) {
  if (!Fp3.eql(Fp3.sqr(root), n))
    throw new Error("Cannot find square root");
}
function sqrt3mod4(Fp3, n) {
  const p1div4 = (Fp3.ORDER + _1n$7) / _4n$2;
  const root = Fp3.pow(n, p1div4);
  assertIsSquare(Fp3, root, n);
  return root;
}
function sqrt5mod8(Fp3, n) {
  const p5div8 = (Fp3.ORDER - _5n$1) / _8n$2;
  const n2 = Fp3.mul(n, _2n$6);
  const v2 = Fp3.pow(n2, p5div8);
  const nv = Fp3.mul(n, v2);
  const i = Fp3.mul(Fp3.mul(nv, _2n$6), v2);
  const root = Fp3.mul(nv, Fp3.sub(i, Fp3.ONE));
  assertIsSquare(Fp3, root, n);
  return root;
}
function sqrt9mod16(P2) {
  const Fp_ = Field(P2);
  const tn = tonelliShanks(P2);
  const c1 = tn(Fp_, Fp_.neg(Fp_.ONE));
  const c2 = tn(Fp_, c1);
  const c3 = tn(Fp_, Fp_.neg(c1));
  const c4 = (P2 + _7n) / _16n;
  return (Fp3, n) => {
    let tv1 = Fp3.pow(n, c4);
    let tv2 = Fp3.mul(tv1, c1);
    const tv3 = Fp3.mul(tv1, c2);
    const tv4 = Fp3.mul(tv1, c3);
    const e1 = Fp3.eql(Fp3.sqr(tv2), n);
    const e2 = Fp3.eql(Fp3.sqr(tv3), n);
    tv1 = Fp3.cmov(tv1, tv2, e1);
    tv2 = Fp3.cmov(tv4, tv3, e2);
    const e3 = Fp3.eql(Fp3.sqr(tv2), n);
    const root = Fp3.cmov(tv1, tv2, e3);
    assertIsSquare(Fp3, root, n);
    return root;
  };
}
function tonelliShanks(P2) {
  if (P2 < _3n$4)
    throw new Error("sqrt is not defined for small field");
  let Q2 = P2 - _1n$7;
  let S2 = 0;
  while (Q2 % _2n$6 === _0n$6) {
    Q2 /= _2n$6;
    S2++;
  }
  let Z2 = _2n$6;
  const _Fp = Field(P2);
  while (FpLegendre(_Fp, Z2) === 1) {
    if (Z2++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S2 === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z2, Q2);
  const Q1div2 = (Q2 + _1n$7) / _2n$6;
  return function tonelliSlow(Fp3, n) {
    if (Fp3.is0(n))
      return n;
    if (FpLegendre(Fp3, n) !== 1)
      throw new Error("Cannot find square root");
    let M2 = S2;
    let c2 = Fp3.mul(Fp3.ONE, cc);
    let t = Fp3.pow(n, Q2);
    let R2 = Fp3.pow(n, Q1div2);
    while (!Fp3.eql(t, Fp3.ONE)) {
      if (Fp3.is0(t))
        return Fp3.ZERO;
      let i = 1;
      let t_tmp = Fp3.sqr(t);
      while (!Fp3.eql(t_tmp, Fp3.ONE)) {
        i++;
        t_tmp = Fp3.sqr(t_tmp);
        if (i === M2)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n$7 << BigInt(M2 - i - 1);
      const b2 = Fp3.pow(c2, exponent);
      M2 = i;
      c2 = Fp3.sqr(b2);
      t = Fp3.mul(t, c2);
      R2 = Fp3.mul(R2, b2);
    }
    return R2;
  };
}
function FpSqrt(P2) {
  if (P2 % _4n$2 === _3n$4)
    return sqrt3mod4;
  if (P2 % _8n$2 === _5n$1)
    return sqrt5mod8;
  if (P2 % _16n === _9n)
    return sqrt9mod16(P2);
  return tonelliShanks(P2);
}
const isNegativeLE = (num, modulo) => (mod(num, modulo) & _1n$7) === _1n$7;
const FIELD_FIELDS = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN"
];
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "number",
    BITS: "number"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  _validateObject(field, opts);
  return field;
}
function FpPow(Fp3, num, power) {
  if (power < _0n$6)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n$6)
    return Fp3.ONE;
  if (power === _1n$7)
    return num;
  let p2 = Fp3.ONE;
  let d2 = num;
  while (power > _0n$6) {
    if (power & _1n$7)
      p2 = Fp3.mul(p2, d2);
    d2 = Fp3.sqr(d2);
    power >>= _1n$7;
  }
  return p2;
}
function FpInvertBatch(Fp3, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp3.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num, i) => {
    if (Fp3.is0(num))
      return acc;
    inverted[i] = acc;
    return Fp3.mul(acc, num);
  }, Fp3.ONE);
  const invertedAcc = Fp3.inv(multipliedAcc);
  nums.reduceRight((acc, num, i) => {
    if (Fp3.is0(num))
      return acc;
    inverted[i] = Fp3.mul(acc, inverted[i]);
    return Fp3.mul(acc, num);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp3, n) {
  const p1mod2 = (Fp3.ORDER - _1n$7) / _2n$6;
  const powered = Fp3.pow(n, p1mod2);
  const yes = Fp3.eql(powered, Fp3.ONE);
  const zero = Fp3.eql(powered, Fp3.ZERO);
  const no = Fp3.eql(powered, Fp3.neg(Fp3.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLenOrOpts, isLE = false, opts = {}) {
  if (ORDER <= _0n$6)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  let _nbitLength = void 0;
  let _sqrt = void 0;
  let modFromBytes = false;
  let allowedLengths = void 0;
  if (typeof bitLenOrOpts === "object" && bitLenOrOpts != null) {
    if (opts.sqrt || isLE)
      throw new Error("cannot specify opts in two arguments");
    const _opts = bitLenOrOpts;
    if (_opts.BITS)
      _nbitLength = _opts.BITS;
    if (_opts.sqrt)
      _sqrt = _opts.sqrt;
    if (typeof _opts.isLE === "boolean")
      isLE = _opts.isLE;
    if (typeof _opts.modFromBytes === "boolean")
      modFromBytes = _opts.modFromBytes;
    allowedLengths = _opts.allowedLengths;
  } else {
    if (typeof bitLenOrOpts === "number")
      _nbitLength = bitLenOrOpts;
    if (opts.sqrt)
      _sqrt = opts.sqrt;
  }
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, _nbitLength);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n$6,
    ONE: _1n$7,
    allowedLengths,
    create: (num) => mod(num, ORDER),
    isValid: (num) => {
      if (typeof num !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num);
      return _0n$6 <= num && num < ORDER;
    },
    is0: (num) => num === _0n$6,
    // is valid and invertible
    isValidNot0: (num) => !f.is0(num) && f.isValid(num),
    isOdd: (num) => (num & _1n$7) === _1n$7,
    neg: (num) => mod(-num, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num) => mod(num * num, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num, power) => FpPow(f, num, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num) => num * num,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num) => invert(num, ORDER),
    sqrt: _sqrt || ((n) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n);
    }),
    toBytes: (num) => isLE ? numberToBytesLE(num, BYTES) : numberToBytesBE(num, BYTES),
    fromBytes: (bytes, skipValidation = true) => {
      if (allowedLengths) {
        if (!allowedLengths.includes(bytes.length) || bytes.length > BYTES) {
          throw new Error("Field.fromBytes: expected " + allowedLengths + " bytes, got " + bytes.length);
        }
        const padded = new Uint8Array(BYTES);
        padded.set(bytes, isLE ? 0 : padded.length - bytes.length);
        bytes = padded;
      }
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      let scalar = isLE ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
      if (modFromBytes)
        scalar = mod(scalar, ORDER);
      if (!skipValidation) {
        if (!f.isValid(scalar))
          throw new Error("invalid field element: outside of range 0..ORDER");
      }
      return scalar;
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a2, b2, c2) => c2 ? b2 : a2
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num = isLE ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num, fieldOrder - _1n$7) + _1n$7;
  return isLE ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$5 = BigInt(0);
const _1n$6 = BigInt(1);
function negateCt(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function normalizeZ(c2, points) {
  const invertedZs = FpInvertBatch(c2.Fp, points.map((p2) => p2.Z));
  return points.map((p2, i) => c2.fromAffine(p2.toAffine(invertedZs[i])));
}
function validateW(W2, bits) {
  if (!Number.isSafeInteger(W2) || W2 <= 0 || W2 > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W2);
}
function calcWOpts(W2, scalarBits) {
  validateW(W2, scalarBits);
  const windows = Math.ceil(scalarBits / W2) + 1;
  const windowSize = 2 ** (W2 - 1);
  const maxNumber = 2 ** W2;
  const mask = bitMask(W2);
  const shiftBy = BigInt(W2);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n & mask);
  let nextN = n >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n$6;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c2) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p2, i) => {
    if (!(p2 instanceof c2))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s2, i) => {
    if (!field.isValid(s2))
      throw new Error("invalid scalar at index " + i);
  });
}
const pointPrecomputes = /* @__PURE__ */ new WeakMap();
const pointWindowSizes = /* @__PURE__ */ new WeakMap();
function getW(P2) {
  return pointWindowSizes.get(P2) || 1;
}
function assert0(n) {
  if (n !== _0n$5)
    throw new Error("invalid wNAF");
}
class wNAF {
  // Parametrized with a given Point class (not individual point)
  constructor(Point, bits) {
    this.BASE = Point.BASE;
    this.ZERO = Point.ZERO;
    this.Fn = Point.Fn;
    this.bits = bits;
  }
  // non-const time multiplication ladder
  _unsafeLadder(elm, n, p2 = this.ZERO) {
    let d2 = elm;
    while (n > _0n$5) {
      if (n & _1n$6)
        p2 = p2.add(d2);
      d2 = d2.double();
      n >>= _1n$6;
    }
    return p2;
  }
  /**
   * Creates a wNAF precomputation window. Used for caching.
   * Default window size is set by `utils.precompute()` and is equal to 8.
   * Number of precomputed points depends on the curve size:
   * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
   * - 𝑊 is the window size
   * - 𝑛 is the bitlength of the curve order.
   * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
   * @param point Point instance
   * @param W window size
   * @returns precomputed point tables flattened to a single array
   */
  precomputeWindow(point, W2) {
    const { windows, windowSize } = calcWOpts(W2, this.bits);
    const points = [];
    let p2 = point;
    let base = p2;
    for (let window2 = 0; window2 < windows; window2++) {
      base = p2;
      points.push(base);
      for (let i = 1; i < windowSize; i++) {
        base = base.add(p2);
        points.push(base);
      }
      p2 = base.double();
    }
    return points;
  }
  /**
   * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
   * More compact implementation:
   * https://github.com/paulmillr/noble-secp256k1/blob/47cb1669b6e506ad66b35fe7d76132ae97465da2/index.ts#L502-L541
   * @returns real and fake (for const-time) points
   */
  wNAF(W2, precomputes, n) {
    if (!this.Fn.isValid(n))
      throw new Error("invalid scalar");
    let p2 = this.ZERO;
    let f = this.BASE;
    const wo = calcWOpts(W2, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n, window2, wo);
      n = nextN;
      if (isZero) {
        f = f.add(negateCt(isNegF, precomputes[offsetF]));
      } else {
        p2 = p2.add(negateCt(isNeg, precomputes[offset]));
      }
    }
    assert0(n);
    return { p: p2, f };
  }
  /**
   * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
   * @param acc accumulator point to add result of multiplication
   * @returns point
   */
  wNAFUnsafe(W2, precomputes, n, acc = this.ZERO) {
    const wo = calcWOpts(W2, this.bits);
    for (let window2 = 0; window2 < wo.windows; window2++) {
      if (n === _0n$5)
        break;
      const { nextN, offset, isZero, isNeg } = calcOffsets(n, window2, wo);
      n = nextN;
      if (isZero) {
        continue;
      } else {
        const item = precomputes[offset];
        acc = acc.add(isNeg ? item.negate() : item);
      }
    }
    assert0(n);
    return acc;
  }
  getPrecomputes(W2, point, transform) {
    let comp = pointPrecomputes.get(point);
    if (!comp) {
      comp = this.precomputeWindow(point, W2);
      if (W2 !== 1) {
        if (typeof transform === "function")
          comp = transform(comp);
        pointPrecomputes.set(point, comp);
      }
    }
    return comp;
  }
  cached(point, scalar, transform) {
    const W2 = getW(point);
    return this.wNAF(W2, this.getPrecomputes(W2, point, transform), scalar);
  }
  unsafe(point, scalar, transform, prev) {
    const W2 = getW(point);
    if (W2 === 1)
      return this._unsafeLadder(point, scalar, prev);
    return this.wNAFUnsafe(W2, this.getPrecomputes(W2, point, transform), scalar, prev);
  }
  // We calculate precomputes for elliptic curve point multiplication
  // using windowed method. This specifies window size and
  // stores precomputed values. Usually only base point would be precomputed.
  createCache(P2, W2) {
    validateW(W2, this.bits);
    pointWindowSizes.set(P2, W2);
    pointPrecomputes.delete(P2);
  }
  hasCache(elm) {
    return getW(elm) !== 1;
  }
}
function mulEndoUnsafe(Point, point, k1, k2) {
  let acc = point;
  let p1 = Point.ZERO;
  let p2 = Point.ZERO;
  while (k1 > _0n$5 || k2 > _0n$5) {
    if (k1 & _1n$6)
      p1 = p1.add(acc);
    if (k2 & _1n$6)
      p2 = p2.add(acc);
    acc = acc.double();
    k1 >>= _1n$6;
    k2 >>= _1n$6;
  }
  return { p1, p2 };
}
function pippenger(c2, fieldN, points, scalars) {
  validateMSMPoints(points, c2);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c2.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j2 = 0; j2 < slength; j2++) {
      const scalar = scalars[j2];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j2]);
    }
    let resI = zero;
    for (let j2 = buckets.length - 1, sumI = zero; j2 > 0; j2--) {
      sumI = sumI.add(buckets[j2]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j2 = 0; j2 < windowSize; j2++)
        sum = sum.double();
  }
  return sum;
}
function createField(order, field, isLE) {
  if (field) {
    if (field.ORDER !== order)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    validateField(field);
    return field;
  } else {
    return Field(order, { isLE });
  }
}
function _createCurveFields(type, CURVE, curveOpts = {}, FpFnLE) {
  if (FpFnLE === void 0)
    FpFnLE = type === "edwards";
  if (!CURVE || typeof CURVE !== "object")
    throw new Error(`expected valid ${type} CURVE object`);
  for (const p2 of ["p", "n", "h"]) {
    const val = CURVE[p2];
    if (!(typeof val === "bigint" && val > _0n$5))
      throw new Error(`CURVE.${p2} must be positive bigint`);
  }
  const Fp3 = createField(CURVE.p, curveOpts.Fp, FpFnLE);
  const Fn = createField(CURVE.n, curveOpts.Fn, FpFnLE);
  const _b2 = type === "weierstrass" ? "b" : "d";
  const params = ["Gx", "Gy", "a", _b2];
  for (const p2 of params) {
    if (!Fp3.isValid(CURVE[p2]))
      throw new Error(`CURVE.${p2} must be valid field element of CURVE.Fp`);
  }
  CURVE = Object.freeze(Object.assign({}, CURVE));
  return { CURVE, Fp: Fp3, Fn };
}
const os2ip = bytesToNumberBE;
function i2osp(value, length) {
  anum(value);
  anum(length);
  if (value < 0 || value >= 1 << 8 * length)
    throw new Error("invalid I2OSP input: " + value);
  const res = Array.from({ length }).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    res[i] = value & 255;
    value >>>= 8;
  }
  return new Uint8Array(res);
}
function strxor(a2, b2) {
  const arr = new Uint8Array(a2.length);
  for (let i = 0; i < a2.length; i++) {
    arr[i] = a2[i] ^ b2[i];
  }
  return arr;
}
function anum(item) {
  if (!Number.isSafeInteger(item))
    throw new Error("number expected");
}
function normDST(DST) {
  if (!isBytes(DST) && typeof DST !== "string")
    throw new Error("DST must be Uint8Array or string");
  return typeof DST === "string" ? utf8ToBytes(DST) : DST;
}
function expand_message_xmd(msg, DST, lenInBytes, H2) {
  abytes(msg);
  anum(lenInBytes);
  DST = normDST(DST);
  if (DST.length > 255)
    DST = H2(concatBytes(utf8ToBytes("H2C-OVERSIZE-DST-"), DST));
  const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H2;
  const ell = Math.ceil(lenInBytes / b_in_bytes);
  if (lenInBytes > 65535 || ell > 255)
    throw new Error("expand_message_xmd: invalid lenInBytes");
  const DST_prime = concatBytes(DST, i2osp(DST.length, 1));
  const Z_pad = i2osp(0, r_in_bytes);
  const l_i_b_str = i2osp(lenInBytes, 2);
  const b2 = new Array(ell);
  const b_0 = H2(concatBytes(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
  b2[0] = H2(concatBytes(b_0, i2osp(1, 1), DST_prime));
  for (let i = 1; i <= ell; i++) {
    const args = [strxor(b_0, b2[i - 1]), i2osp(i + 1, 1), DST_prime];
    b2[i] = H2(concatBytes(...args));
  }
  const pseudo_random_bytes = concatBytes(...b2);
  return pseudo_random_bytes.slice(0, lenInBytes);
}
function expand_message_xof(msg, DST, lenInBytes, k2, H2) {
  abytes(msg);
  anum(lenInBytes);
  DST = normDST(DST);
  if (DST.length > 255) {
    const dkLen = Math.ceil(2 * k2 / 8);
    DST = H2.create({ dkLen }).update(utf8ToBytes("H2C-OVERSIZE-DST-")).update(DST).digest();
  }
  if (lenInBytes > 65535 || DST.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return H2.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
function hash_to_field(msg, count, options) {
  _validateObject(options, {
    p: "bigint",
    m: "number",
    k: "number",
    hash: "function"
  });
  const { p: p2, k: k2, m: m2, hash, expand, DST } = options;
  if (!isHash(options.hash))
    throw new Error("expected valid hash");
  abytes(msg);
  anum(count);
  const log2p = p2.toString(2).length;
  const L2 = Math.ceil((log2p + k2) / 8);
  const len_in_bytes = count * m2 * L2;
  let prb;
  if (expand === "xmd") {
    prb = expand_message_xmd(msg, DST, len_in_bytes, hash);
  } else if (expand === "xof") {
    prb = expand_message_xof(msg, DST, len_in_bytes, k2, hash);
  } else if (expand === "_internal_pass") {
    prb = msg;
  } else {
    throw new Error('expand must be "xmd" or "xof"');
  }
  const u = new Array(count);
  for (let i = 0; i < count; i++) {
    const e = new Array(m2);
    for (let j2 = 0; j2 < m2; j2++) {
      const elm_offset = L2 * (j2 + i * m2);
      const tv = prb.subarray(elm_offset, elm_offset + L2);
      e[j2] = mod(os2ip(tv), p2);
    }
    u[i] = e;
  }
  return u;
}
function isogenyMap(field, map) {
  const coeff = map.map((i) => Array.from(i).reverse());
  return (x2, y2) => {
    const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x2), i)));
    const [xd_inv, yd_inv] = FpInvertBatch(field, [xd, yd], true);
    x2 = field.mul(xn, xd_inv);
    y2 = field.mul(y2, field.mul(yn, yd_inv));
    return { x: x2, y: y2 };
  };
}
const _DST_scalar = utf8ToBytes("HashToScalar-");
function createHasher(Point, mapToCurve, defaults) {
  if (typeof mapToCurve !== "function")
    throw new Error("mapToCurve() must be defined");
  function map(num) {
    return Point.fromAffine(mapToCurve(num));
  }
  function clear(initial) {
    const P2 = initial.clearCofactor();
    if (P2.equals(Point.ZERO))
      return Point.ZERO;
    P2.assertValidity();
    return P2;
  }
  return {
    defaults,
    hashToCurve(msg, options) {
      const opts = Object.assign({}, defaults, options);
      const u = hash_to_field(msg, 2, opts);
      const u0 = map(u[0]);
      const u1 = map(u[1]);
      return clear(u0.add(u1));
    },
    encodeToCurve(msg, options) {
      const optsDst = defaults.encodeDST ? { DST: defaults.encodeDST } : {};
      const opts = Object.assign({}, defaults, optsDst, options);
      const u = hash_to_field(msg, 1, opts);
      const u0 = map(u[0]);
      return clear(u0);
    },
    /** See {@link H2CHasher} */
    mapToCurve(scalars) {
      if (!Array.isArray(scalars))
        throw new Error("expected array of bigints");
      for (const i of scalars)
        if (typeof i !== "bigint")
          throw new Error("expected array of bigints");
      return clear(map(scalars));
    },
    // hash_to_scalar can produce 0: https://www.rfc-editor.org/errata/eid8393
    // RFC 9380, draft-irtf-cfrg-bbs-signatures-08
    hashToScalar(msg, options) {
      const N2 = Point.Fn.ORDER;
      const opts = Object.assign({}, defaults, { p: N2, m: 1, DST: _DST_scalar }, options);
      return hash_to_field(msg, 1, opts)[0][0];
    }
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const divNearest = (num, den) => (num + (num >= 0 ? den : -den) / _2n$5) / den;
function _splitEndoScalar(k2, basis, n) {
  const [[a1, b1], [a2, b2]] = basis;
  const c1 = divNearest(b2 * k2, n);
  const c2 = divNearest(-b1 * k2, n);
  let k1 = k2 - c1 * a1 - c2 * a2;
  let k22 = -c1 * b1 - c2 * b2;
  const k1neg = k1 < _0n$4;
  const k2neg = k22 < _0n$4;
  if (k1neg)
    k1 = -k1;
  if (k2neg)
    k22 = -k22;
  const MAX_NUM = bitMask(Math.ceil(bitLen(n) / 2)) + _1n$5;
  if (k1 < _0n$4 || k1 >= MAX_NUM || k22 < _0n$4 || k22 >= MAX_NUM) {
    throw new Error("splitScalar (endomorphism): failed, k=" + k2);
  }
  return { k1neg, k1, k2neg, k2: k22 };
}
const _0n$4 = BigInt(0), _1n$5 = BigInt(1), _2n$5 = BigInt(2), _3n$3 = BigInt(3), _4n$1 = BigInt(4);
function _normFnElement(Fn, key) {
  const { BYTES: expected } = Fn;
  let num;
  if (typeof key === "bigint") {
    num = key;
  } else {
    let bytes = ensureBytes("private key", key);
    try {
      num = Fn.fromBytes(bytes);
    } catch (error) {
      throw new Error(`invalid private key: expected ui8a of size ${expected}, got ${typeof key}`);
    }
  }
  if (!Fn.isValidNot0(num))
    throw new Error("invalid private key: out of range [1..N-1]");
  return num;
}
function weierstrassN(params, extraOpts = {}) {
  const validated = _createCurveFields("weierstrass", params, extraOpts);
  const { Fp: Fp3, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor, n: CURVE_ORDER } = CURVE;
  _validateObject(extraOpts, {}, {
    allowInfinityPoint: "boolean",
    clearCofactor: "function",
    isTorsionFree: "function",
    fromBytes: "function",
    toBytes: "function",
    endo: "object",
    wrapPrivateKey: "boolean"
  });
  const { endo } = extraOpts;
  if (endo) {
    if (!Fp3.is0(CURVE.a) || typeof endo.beta !== "bigint" || !Array.isArray(endo.basises)) {
      throw new Error('invalid endo: expected "beta": bigint and "basises": array');
    }
  }
  const lengths = getWLengths(Fp3, Fn);
  function assertCompressionIsSupported() {
    if (!Fp3.isOdd)
      throw new Error("compression is not supported: Field does not have .isOdd()");
  }
  function pointToBytes(_c, point, isCompressed) {
    const { x: x2, y: y2 } = point.toAffine();
    const bx = Fp3.toBytes(x2);
    _abool2(isCompressed, "isCompressed");
    if (isCompressed) {
      assertCompressionIsSupported();
      const hasEvenY = !Fp3.isOdd(y2);
      return concatBytes(pprefix(hasEvenY), bx);
    } else {
      return concatBytes(Uint8Array.of(4), bx, Fp3.toBytes(y2));
    }
  }
  function pointFromBytes(bytes) {
    _abytes2(bytes, void 0, "Point");
    const { publicKey: comp, publicKeyUncompressed: uncomp } = lengths;
    const length = bytes.length;
    const head = bytes[0];
    const tail = bytes.subarray(1);
    if (length === comp && (head === 2 || head === 3)) {
      const x2 = Fp3.fromBytes(tail);
      if (!Fp3.isValid(x2))
        throw new Error("bad point: is not on curve, wrong x");
      const y2 = weierstrassEquation(x2);
      let y3;
      try {
        y3 = Fp3.sqrt(y2);
      } catch (sqrtError) {
        const err = sqrtError instanceof Error ? ": " + sqrtError.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + err);
      }
      assertCompressionIsSupported();
      const isYOdd = Fp3.isOdd(y3);
      const isHeadOdd = (head & 1) === 1;
      if (isHeadOdd !== isYOdd)
        y3 = Fp3.neg(y3);
      return { x: x2, y: y3 };
    } else if (length === uncomp && head === 4) {
      const L2 = Fp3.BYTES;
      const x2 = Fp3.fromBytes(tail.subarray(0, L2));
      const y2 = Fp3.fromBytes(tail.subarray(L2, L2 * 2));
      if (!isValidXY(x2, y2))
        throw new Error("bad point: is not on curve");
      return { x: x2, y: y2 };
    } else {
      throw new Error(`bad point: got length ${length}, expected compressed=${comp} or uncompressed=${uncomp}`);
    }
  }
  const encodePoint = extraOpts.toBytes || pointToBytes;
  const decodePoint = extraOpts.fromBytes || pointFromBytes;
  function weierstrassEquation(x2) {
    const x22 = Fp3.sqr(x2);
    const x3 = Fp3.mul(x22, x2);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x2, CURVE.a)), CURVE.b);
  }
  function isValidXY(x2, y2) {
    const left = Fp3.sqr(y2);
    const right = weierstrassEquation(x2);
    return Fp3.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp3.mul(Fp3.pow(CURVE.a, _3n$3), _4n$1);
  const _27b2 = Fp3.mul(Fp3.sqr(CURVE.b), BigInt(27));
  if (Fp3.is0(Fp3.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function acoord(title, n, banZero = false) {
    if (!Fp3.isValid(n) || banZero && Fp3.is0(n))
      throw new Error(`bad point coordinate ${title}`);
    return n;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ProjectivePoint expected");
  }
  function splitEndoScalarN(k2) {
    if (!endo || !endo.basises)
      throw new Error("no endo");
    return _splitEndoScalar(k2, endo.basises, Fn.ORDER);
  }
  const toAffineMemo = memoized((p2, iz) => {
    const { X: X2, Y: Y2, Z: Z2 } = p2;
    if (Fp3.eql(Z2, Fp3.ONE))
      return { x: X2, y: Y2 };
    const is0 = p2.is0();
    if (iz == null)
      iz = is0 ? Fp3.ONE : Fp3.inv(Z2);
    const x2 = Fp3.mul(X2, iz);
    const y2 = Fp3.mul(Y2, iz);
    const zz = Fp3.mul(Z2, iz);
    if (is0)
      return { x: Fp3.ZERO, y: Fp3.ZERO };
    if (!Fp3.eql(zz, Fp3.ONE))
      throw new Error("invZ was invalid");
    return { x: x2, y: y2 };
  });
  const assertValidMemo = memoized((p2) => {
    if (p2.is0()) {
      if (extraOpts.allowInfinityPoint && !Fp3.is0(p2.Y))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x: x2, y: y2 } = p2.toAffine();
    if (!Fp3.isValid(x2) || !Fp3.isValid(y2))
      throw new Error("bad point: x or y not field elements");
    if (!isValidXY(x2, y2))
      throw new Error("bad point: equation left != right");
    if (!p2.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  function finishEndo(endoBeta, k1p, k2p, k1neg, k2neg) {
    k2p = new Point(Fp3.mul(k2p.X, endoBeta), k2p.Y, k2p.Z);
    k1p = negateCt(k1neg, k1p);
    k2p = negateCt(k2neg, k2p);
    return k1p.add(k2p);
  }
  class Point {
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    constructor(X2, Y2, Z2) {
      this.X = acoord("x", X2);
      this.Y = acoord("y", Y2, true);
      this.Z = acoord("z", Z2);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    /** Does NOT validate if the point is valid. Use `.assertValidity()`. */
    static fromAffine(p2) {
      const { x: x2, y: y2 } = p2 || {};
      if (!p2 || !Fp3.isValid(x2) || !Fp3.isValid(y2))
        throw new Error("invalid affine point");
      if (p2 instanceof Point)
        throw new Error("projective point not allowed");
      if (Fp3.is0(x2) && Fp3.is0(y2))
        return Point.ZERO;
      return new Point(x2, y2, Fp3.ONE);
    }
    static fromBytes(bytes) {
      const P2 = Point.fromAffine(decodePoint(_abytes2(bytes, void 0, "point")));
      P2.assertValidity();
      return P2;
    }
    static fromHex(hex) {
      return Point.fromBytes(ensureBytes("pointHex", hex));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     *
     * @param windowSize
     * @param isLazy true will defer table computation until the first multiplication
     * @returns
     */
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_3n$3);
      return this;
    }
    // TODO: return `this`
    /** A point on curve is valid if it conforms to equation. */
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y: y2 } = this.toAffine();
      if (!Fp3.isOdd)
        throw new Error("Field doesn't support isOdd");
      return !Fp3.isOdd(y2);
    }
    /** Compare one point to another. */
    equals(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const U1 = Fp3.eql(Fp3.mul(X1, Z2), Fp3.mul(X2, Z1));
      const U2 = Fp3.eql(Fp3.mul(Y1, Z2), Fp3.mul(Y2, Z1));
      return U1 && U2;
    }
    /** Flips point to one corresponding to (x, -y) in Affine coordinates. */
    negate() {
      return new Point(this.X, Fp3.neg(this.Y), this.Z);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a: a2, b: b2 } = CURVE;
      const b3 = Fp3.mul(b2, _3n$3);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      let t0 = Fp3.mul(X1, X1);
      let t1 = Fp3.mul(Y1, Y1);
      let t2 = Fp3.mul(Z1, Z1);
      let t3 = Fp3.mul(X1, Y1);
      t3 = Fp3.add(t3, t3);
      Z3 = Fp3.mul(X1, Z1);
      Z3 = Fp3.add(Z3, Z3);
      X3 = Fp3.mul(a2, Z3);
      Y3 = Fp3.mul(b3, t2);
      Y3 = Fp3.add(X3, Y3);
      X3 = Fp3.sub(t1, Y3);
      Y3 = Fp3.add(t1, Y3);
      Y3 = Fp3.mul(X3, Y3);
      X3 = Fp3.mul(t3, X3);
      Z3 = Fp3.mul(b3, Z3);
      t2 = Fp3.mul(a2, t2);
      t3 = Fp3.sub(t0, t2);
      t3 = Fp3.mul(a2, t3);
      t3 = Fp3.add(t3, Z3);
      Z3 = Fp3.add(t0, t0);
      t0 = Fp3.add(Z3, t0);
      t0 = Fp3.add(t0, t2);
      t0 = Fp3.mul(t0, t3);
      Y3 = Fp3.add(Y3, t0);
      t2 = Fp3.mul(Y1, Z1);
      t2 = Fp3.add(t2, t2);
      t0 = Fp3.mul(t2, t3);
      X3 = Fp3.sub(X3, t0);
      Z3 = Fp3.mul(t2, t1);
      Z3 = Fp3.add(Z3, Z3);
      Z3 = Fp3.add(Z3, Z3);
      return new Point(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      let X3 = Fp3.ZERO, Y3 = Fp3.ZERO, Z3 = Fp3.ZERO;
      const a2 = CURVE.a;
      const b3 = Fp3.mul(CURVE.b, _3n$3);
      let t0 = Fp3.mul(X1, X2);
      let t1 = Fp3.mul(Y1, Y2);
      let t2 = Fp3.mul(Z1, Z2);
      let t3 = Fp3.add(X1, Y1);
      let t4 = Fp3.add(X2, Y2);
      t3 = Fp3.mul(t3, t4);
      t4 = Fp3.add(t0, t1);
      t3 = Fp3.sub(t3, t4);
      t4 = Fp3.add(X1, Z1);
      let t5 = Fp3.add(X2, Z2);
      t4 = Fp3.mul(t4, t5);
      t5 = Fp3.add(t0, t2);
      t4 = Fp3.sub(t4, t5);
      t5 = Fp3.add(Y1, Z1);
      X3 = Fp3.add(Y2, Z2);
      t5 = Fp3.mul(t5, X3);
      X3 = Fp3.add(t1, t2);
      t5 = Fp3.sub(t5, X3);
      Z3 = Fp3.mul(a2, t4);
      X3 = Fp3.mul(b3, t2);
      Z3 = Fp3.add(X3, Z3);
      X3 = Fp3.sub(t1, Z3);
      Z3 = Fp3.add(t1, Z3);
      Y3 = Fp3.mul(X3, Z3);
      t1 = Fp3.add(t0, t0);
      t1 = Fp3.add(t1, t0);
      t2 = Fp3.mul(a2, t2);
      t4 = Fp3.mul(b3, t4);
      t1 = Fp3.add(t1, t2);
      t2 = Fp3.sub(t0, t2);
      t2 = Fp3.mul(a2, t2);
      t4 = Fp3.add(t4, t2);
      t0 = Fp3.mul(t1, t4);
      Y3 = Fp3.add(Y3, t0);
      t0 = Fp3.mul(t5, t4);
      X3 = Fp3.mul(t3, X3);
      X3 = Fp3.sub(X3, t0);
      t0 = Fp3.mul(t3, t1);
      Z3 = Fp3.mul(t5, Z3);
      Z3 = Fp3.add(Z3, t0);
      return new Point(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2 } = extraOpts;
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: out of range");
      let point, fake;
      const mul = (n) => wnaf.cached(this, n, (p2) => normalizeZ(Point, p2));
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(scalar);
        const { p: k1p, f: k1f } = mul(k1);
        const { p: k2p, f: k2f } = mul(k2);
        fake = k1f.add(k2f);
        point = finishEndo(endo2.beta, k1p, k2p, k1neg, k2neg);
      } else {
        const { p: p2, f } = mul(scalar);
        point = p2;
        fake = f;
      }
      return normalizeZ(Point, [point, fake])[0];
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed secret key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2 } = extraOpts;
      const p2 = this;
      if (!Fn.isValid(sc))
        throw new Error("invalid scalar: out of range");
      if (sc === _0n$4 || p2.is0())
        return Point.ZERO;
      if (sc === _1n$5)
        return p2;
      if (wnaf.hasCache(this))
        return this.multiply(sc);
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = splitEndoScalarN(sc);
        const { p1, p2: p22 } = mulEndoUnsafe(Point, p2, k1, k2);
        return finishEndo(endo2.beta, p1, p22, k1neg, k2neg);
      } else {
        return wnaf.unsafe(p2, sc);
      }
    }
    multiplyAndAddUnsafe(Q2, a2, b2) {
      const sum = this.multiplyUnsafe(a2).add(Q2.multiplyUnsafe(b2));
      return sum.is0() ? void 0 : sum;
    }
    /**
     * Converts Projective point to affine (x, y) coordinates.
     * @param invertedZ Z^-1 (inverted zero) - optional, precomputation is useful for invertBatch
     */
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    /**
     * Checks whether Point is free of torsion elements (is in prime subgroup).
     * Always torsion-free for cofactor=1 curves.
     */
    isTorsionFree() {
      const { isTorsionFree } = extraOpts;
      if (cofactor === _1n$5)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point, this);
      return wnaf.unsafe(this, CURVE_ORDER).is0();
    }
    clearCofactor() {
      const { clearCofactor } = extraOpts;
      if (cofactor === _1n$5)
        return this;
      if (clearCofactor)
        return clearCofactor(Point, this);
      return this.multiplyUnsafe(cofactor);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    toBytes(isCompressed = true) {
      _abool2(isCompressed, "isCompressed");
      this.assertValidity();
      return encodePoint(Point, this, isCompressed);
    }
    toHex(isCompressed = true) {
      return bytesToHex(this.toBytes(isCompressed));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(isCompressed = true) {
      return this.toBytes(isCompressed);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    static fromPrivateKey(privateKey) {
      return Point.BASE.multiply(_normFnElement(Fn, privateKey));
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, Fp3.ONE);
  Point.ZERO = new Point(Fp3.ZERO, Fp3.ONE, Fp3.ZERO);
  Point.Fp = Fp3;
  Point.Fn = Fn;
  const bits = Fn.BITS;
  const wnaf = new wNAF(Point, extraOpts.endo ? Math.ceil(bits / 2) : bits);
  Point.BASE.precompute(8);
  return Point;
}
function pprefix(hasEvenY) {
  return Uint8Array.of(hasEvenY ? 2 : 3);
}
function SWUFpSqrtRatio(Fp3, Z2) {
  const q2 = Fp3.ORDER;
  let l = _0n$4;
  for (let o2 = q2 - _1n$5; o2 % _2n$5 === _0n$4; o2 /= _2n$5)
    l += _1n$5;
  const c1 = l;
  const _2n_pow_c1_1 = _2n$5 << c1 - _1n$5 - _1n$5;
  const _2n_pow_c1 = _2n_pow_c1_1 * _2n$5;
  const c2 = (q2 - _1n$5) / _2n_pow_c1;
  const c3 = (c2 - _1n$5) / _2n$5;
  const c4 = _2n_pow_c1 - _1n$5;
  const c5 = _2n_pow_c1_1;
  const c6 = Fp3.pow(Z2, c2);
  const c7 = Fp3.pow(Z2, (c2 + _1n$5) / _2n$5);
  let sqrtRatio = (u, v2) => {
    let tv1 = c6;
    let tv2 = Fp3.pow(v2, c4);
    let tv3 = Fp3.sqr(tv2);
    tv3 = Fp3.mul(tv3, v2);
    let tv5 = Fp3.mul(u, tv3);
    tv5 = Fp3.pow(tv5, c3);
    tv5 = Fp3.mul(tv5, tv2);
    tv2 = Fp3.mul(tv5, v2);
    tv3 = Fp3.mul(tv5, u);
    let tv4 = Fp3.mul(tv3, tv2);
    tv5 = Fp3.pow(tv4, c5);
    let isQR = Fp3.eql(tv5, Fp3.ONE);
    tv2 = Fp3.mul(tv3, c7);
    tv5 = Fp3.mul(tv4, tv1);
    tv3 = Fp3.cmov(tv2, tv3, isQR);
    tv4 = Fp3.cmov(tv5, tv4, isQR);
    for (let i = c1; i > _1n$5; i--) {
      let tv52 = i - _2n$5;
      tv52 = _2n$5 << tv52 - _1n$5;
      let tvv5 = Fp3.pow(tv4, tv52);
      const e1 = Fp3.eql(tvv5, Fp3.ONE);
      tv2 = Fp3.mul(tv3, tv1);
      tv1 = Fp3.mul(tv1, tv1);
      tvv5 = Fp3.mul(tv4, tv1);
      tv3 = Fp3.cmov(tv2, tv3, e1);
      tv4 = Fp3.cmov(tvv5, tv4, e1);
    }
    return { isValid: isQR, value: tv3 };
  };
  if (Fp3.ORDER % _4n$1 === _3n$3) {
    const c12 = (Fp3.ORDER - _3n$3) / _4n$1;
    const c22 = Fp3.sqrt(Fp3.neg(Z2));
    sqrtRatio = (u, v2) => {
      let tv1 = Fp3.sqr(v2);
      const tv2 = Fp3.mul(u, v2);
      tv1 = Fp3.mul(tv1, tv2);
      let y1 = Fp3.pow(tv1, c12);
      y1 = Fp3.mul(y1, tv2);
      const y2 = Fp3.mul(y1, c22);
      const tv3 = Fp3.mul(Fp3.sqr(y1), v2);
      const isQR = Fp3.eql(tv3, u);
      let y3 = Fp3.cmov(y2, y1, isQR);
      return { isValid: isQR, value: y3 };
    };
  }
  return sqrtRatio;
}
function mapToCurveSimpleSWU(Fp3, opts) {
  validateField(Fp3);
  const { A: A2, B: B2, Z: Z2 } = opts;
  if (!Fp3.isValid(A2) || !Fp3.isValid(B2) || !Fp3.isValid(Z2))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const sqrtRatio = SWUFpSqrtRatio(Fp3, Z2);
  if (!Fp3.isOdd)
    throw new Error("Field does not have .isOdd()");
  return (u) => {
    let tv1, tv2, tv3, tv4, tv5, tv6, x2, y2;
    tv1 = Fp3.sqr(u);
    tv1 = Fp3.mul(tv1, Z2);
    tv2 = Fp3.sqr(tv1);
    tv2 = Fp3.add(tv2, tv1);
    tv3 = Fp3.add(tv2, Fp3.ONE);
    tv3 = Fp3.mul(tv3, B2);
    tv4 = Fp3.cmov(Z2, Fp3.neg(tv2), !Fp3.eql(tv2, Fp3.ZERO));
    tv4 = Fp3.mul(tv4, A2);
    tv2 = Fp3.sqr(tv3);
    tv6 = Fp3.sqr(tv4);
    tv5 = Fp3.mul(tv6, A2);
    tv2 = Fp3.add(tv2, tv5);
    tv2 = Fp3.mul(tv2, tv3);
    tv6 = Fp3.mul(tv6, tv4);
    tv5 = Fp3.mul(tv6, B2);
    tv2 = Fp3.add(tv2, tv5);
    x2 = Fp3.mul(tv1, tv3);
    const { isValid, value } = sqrtRatio(tv2, tv6);
    y2 = Fp3.mul(tv1, u);
    y2 = Fp3.mul(y2, value);
    x2 = Fp3.cmov(x2, tv3, isValid);
    y2 = Fp3.cmov(y2, value, isValid);
    const e1 = Fp3.isOdd(u) === Fp3.isOdd(y2);
    y2 = Fp3.cmov(Fp3.neg(y2), y2, e1);
    const tv4_inv = FpInvertBatch(Fp3, [tv4], true)[0];
    x2 = Fp3.mul(x2, tv4_inv);
    return { x: x2, y: y2 };
  };
}
function getWLengths(Fp3, Fn) {
  return {
    secretKey: Fn.BYTES,
    publicKey: 1 + Fp3.BYTES,
    publicKeyUncompressed: 1 + 2 * Fp3.BYTES,
    publicKeyHasPrefix: true,
    signature: 2 * Fn.BYTES
  };
}
function weierstrassPoints(c2) {
  const { CURVE, curveOpts } = _weierstrass_legacy_opts_to_new(c2);
  const Point = weierstrassN(CURVE, curveOpts);
  return _weierstrass_new_output_to_legacy(c2, Point);
}
function _weierstrass_legacy_opts_to_new(c2) {
  const CURVE = {
    a: c2.a,
    b: c2.b,
    p: c2.Fp.ORDER,
    n: c2.n,
    h: c2.h,
    Gx: c2.Gx,
    Gy: c2.Gy
  };
  const Fp3 = c2.Fp;
  let allowedLengths = c2.allowedPrivateKeyLengths ? Array.from(new Set(c2.allowedPrivateKeyLengths.map((l) => Math.ceil(l / 2)))) : void 0;
  const Fn = Field(CURVE.n, {
    BITS: c2.nBitLength,
    allowedLengths,
    modFromBytes: c2.wrapPrivateKey
  });
  const curveOpts = {
    Fp: Fp3,
    Fn,
    allowInfinityPoint: c2.allowInfinityPoint,
    endo: c2.endo,
    isTorsionFree: c2.isTorsionFree,
    clearCofactor: c2.clearCofactor,
    fromBytes: c2.fromBytes,
    toBytes: c2.toBytes
  };
  return { CURVE, curveOpts };
}
function _legacyHelperEquat(Fp3, a2, b2) {
  function weierstrassEquation(x2) {
    const x22 = Fp3.sqr(x2);
    const x3 = Fp3.mul(x22, x2);
    return Fp3.add(Fp3.add(x3, Fp3.mul(x2, a2)), b2);
  }
  return weierstrassEquation;
}
function _weierstrass_new_output_to_legacy(c2, Point) {
  const { Fp: Fp3, Fn } = Point;
  function isWithinCurveOrder(num) {
    return inRange(num, _1n$5, Fn.ORDER);
  }
  const weierstrassEquation = _legacyHelperEquat(Fp3, c2.a, c2.b);
  return Object.assign({}, {
    CURVE: c2,
    Point,
    ProjectivePoint: Point,
    normPrivateKeyToScalar: (key) => _normFnElement(Fn, key),
    weierstrassEquation,
    isWithinCurveOrder
  });
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$3 = BigInt(0), _1n$4 = BigInt(1), _2n$4 = BigInt(2), _3n$2 = BigInt(3);
function NAfDecomposition(a2) {
  const res = [];
  for (; a2 > _1n$4; a2 >>= _1n$4) {
    if ((a2 & _1n$4) === _0n$3)
      res.unshift(0);
    else if ((a2 & _3n$2) === _3n$2) {
      res.unshift(-1);
      a2 += _1n$4;
    } else
      res.unshift(1);
  }
  return res;
}
function aNonEmpty(arr) {
  if (!Array.isArray(arr) || arr.length === 0)
    throw new Error("expected non-empty array");
}
function createBlsPairing(fields, G1, G2, params) {
  const { Fp2: Fp22, Fp12: Fp122 } = fields;
  const { twistType, ateLoopSize, xNegative, postPrecompute } = params;
  let lineFunction;
  if (twistType === "multiplicative") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul014(f, c0, Fp22.mul(c1, Px), Fp22.mul(c2, Py));
  } else if (twistType === "divisive") {
    lineFunction = (c0, c1, c2, f, Px, Py) => Fp122.mul034(f, Fp22.mul(c2, Py), Fp22.mul(c1, Px), c0);
  } else
    throw new Error("bls: unknown twist type");
  const Fp2div2 = Fp22.div(Fp22.ONE, Fp22.mul(Fp22.ONE, _2n$4));
  function pointDouble(ell, Rx, Ry, Rz) {
    const t0 = Fp22.sqr(Ry);
    const t1 = Fp22.sqr(Rz);
    const t2 = Fp22.mulByB(Fp22.mul(t1, _3n$2));
    const t3 = Fp22.mul(t2, _3n$2);
    const t4 = Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(Ry, Rz)), t1), t0);
    const c0 = Fp22.sub(t2, t0);
    const c1 = Fp22.mul(Fp22.sqr(Rx), _3n$2);
    const c2 = Fp22.neg(t4);
    ell.push([c0, c1, c2]);
    Rx = Fp22.mul(Fp22.mul(Fp22.mul(Fp22.sub(t0, t3), Rx), Ry), Fp2div2);
    Ry = Fp22.sub(Fp22.sqr(Fp22.mul(Fp22.add(t0, t3), Fp2div2)), Fp22.mul(Fp22.sqr(t2), _3n$2));
    Rz = Fp22.mul(t0, t4);
    return { Rx, Ry, Rz };
  }
  function pointAdd(ell, Rx, Ry, Rz, Qx, Qy) {
    const t0 = Fp22.sub(Ry, Fp22.mul(Qy, Rz));
    const t1 = Fp22.sub(Rx, Fp22.mul(Qx, Rz));
    const c0 = Fp22.sub(Fp22.mul(t0, Qx), Fp22.mul(t1, Qy));
    const c1 = Fp22.neg(t0);
    const c2 = t1;
    ell.push([c0, c1, c2]);
    const t2 = Fp22.sqr(t1);
    const t3 = Fp22.mul(t2, t1);
    const t4 = Fp22.mul(t2, Rx);
    const t5 = Fp22.add(Fp22.sub(t3, Fp22.mul(t4, _2n$4)), Fp22.mul(Fp22.sqr(t0), Rz));
    Rx = Fp22.mul(t1, t5);
    Ry = Fp22.sub(Fp22.mul(Fp22.sub(t4, t5), t0), Fp22.mul(t3, Ry));
    Rz = Fp22.mul(Rz, t3);
    return { Rx, Ry, Rz };
  }
  const ATE_NAF = NAfDecomposition(ateLoopSize);
  const calcPairingPrecomputes = memoized((point) => {
    const p2 = point;
    const { x: x2, y: y2 } = p2.toAffine();
    const Qx = x2, Qy = y2, negQy = Fp22.neg(y2);
    let Rx = Qx, Ry = Qy, Rz = Fp22.ONE;
    const ell = [];
    for (const bit of ATE_NAF) {
      const cur = [];
      ({ Rx, Ry, Rz } = pointDouble(cur, Rx, Ry, Rz));
      if (bit)
        ({ Rx, Ry, Rz } = pointAdd(cur, Rx, Ry, Rz, Qx, bit === -1 ? negQy : Qy));
      ell.push(cur);
    }
    if (postPrecompute) {
      const last = ell[ell.length - 1];
      postPrecompute(Rx, Ry, Rz, Qx, Qy, pointAdd.bind(null, last));
    }
    return ell;
  });
  function millerLoopBatch(pairs, withFinalExponent = false) {
    let f12 = Fp122.ONE;
    if (pairs.length) {
      const ellLen = pairs[0][0].length;
      for (let i = 0; i < ellLen; i++) {
        f12 = Fp122.sqr(f12);
        for (const [ell, Px, Py] of pairs) {
          for (const [c0, c1, c2] of ell[i])
            f12 = lineFunction(c0, c1, c2, f12, Px, Py);
        }
      }
    }
    if (xNegative)
      f12 = Fp122.conjugate(f12);
    return withFinalExponent ? Fp122.finalExponentiate(f12) : f12;
  }
  function pairingBatch(pairs, withFinalExponent = true) {
    const res = [];
    normalizeZ(G1, pairs.map(({ g1 }) => g1));
    normalizeZ(G2, pairs.map(({ g2 }) => g2));
    for (const { g1, g2 } of pairs) {
      if (g1.is0() || g2.is0())
        throw new Error("pairing is not available for ZERO point");
      g1.assertValidity();
      g2.assertValidity();
      const Qa = g1.toAffine();
      res.push([calcPairingPrecomputes(g2), Qa.x, Qa.y]);
    }
    return millerLoopBatch(res, withFinalExponent);
  }
  function pairing(Q2, P2, withFinalExponent = true) {
    return pairingBatch([{ g1: Q2, g2: P2 }], withFinalExponent);
  }
  return {
    Fp12: Fp122,
    // NOTE: we re-export Fp12 here because pairing results are Fp12!
    millerLoopBatch,
    pairing,
    pairingBatch,
    calcPairingPrecomputes
  };
}
function createBlsSig(blsPairing, PubCurve, SigCurve, SignatureCoder, isSigG1) {
  const { Fp12: Fp122, pairingBatch } = blsPairing;
  function normPub(point) {
    return point instanceof PubCurve.Point ? point : PubCurve.Point.fromHex(point);
  }
  function normSig(point) {
    return point instanceof SigCurve.Point ? point : SigCurve.Point.fromHex(point);
  }
  function amsg(m2) {
    if (!(m2 instanceof SigCurve.Point))
      throw new Error(`expected valid message hashed to ${!isSigG1 ? "G2" : "G1"} curve`);
    return m2;
  }
  const pair = !isSigG1 ? (a2, b2) => ({ g1: a2, g2: b2 }) : (a2, b2) => ({ g1: b2, g2: a2 });
  return {
    // P = pk x G
    getPublicKey(secretKey) {
      const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
      return PubCurve.Point.BASE.multiply(sec);
    },
    // S = pk x H(m)
    sign(message, secretKey, unusedArg) {
      if (unusedArg != null)
        throw new Error("sign() expects 2 arguments");
      const sec = _normFnElement(PubCurve.Point.Fn, secretKey);
      amsg(message).assertValidity();
      return message.multiply(sec);
    },
    // Checks if pairing of public key & hash is equal to pairing of generator & signature.
    // e(P, H(m)) == e(G, S)
    // e(S, G) == e(H(m), P)
    verify(signature, message, publicKey, unusedArg) {
      if (unusedArg != null)
        throw new Error("verify() expects 3 arguments");
      signature = normSig(signature);
      publicKey = normPub(publicKey);
      const P2 = publicKey.negate();
      const G2 = PubCurve.Point.BASE;
      const Hm = amsg(message);
      const S2 = signature;
      const exp = pairingBatch([pair(P2, Hm), pair(G2, S2)]);
      return Fp122.eql(exp, Fp122.ONE);
    },
    // https://ethresear.ch/t/fast-verification-of-multiple-bls-signatures/5407
    // e(G, S) = e(G, SUM(n)(Si)) = MUL(n)(e(G, Si))
    // TODO: maybe `{message: G2Hex, publicKey: G1Hex}[]` instead?
    verifyBatch(signature, messages, publicKeys) {
      aNonEmpty(messages);
      if (publicKeys.length !== messages.length)
        throw new Error("amount of public keys and messages should be equal");
      const sig = normSig(signature);
      const nMessages = messages;
      const nPublicKeys = publicKeys.map(normPub);
      const messagePubKeyMap = /* @__PURE__ */ new Map();
      for (let i = 0; i < nPublicKeys.length; i++) {
        const pub = nPublicKeys[i];
        const msg = nMessages[i];
        let keys = messagePubKeyMap.get(msg);
        if (keys === void 0) {
          keys = [];
          messagePubKeyMap.set(msg, keys);
        }
        keys.push(pub);
      }
      const paired = [];
      const G2 = PubCurve.Point.BASE;
      try {
        for (const [msg, keys] of messagePubKeyMap) {
          const groupPublicKey = keys.reduce((acc, msg2) => acc.add(msg2));
          paired.push(pair(groupPublicKey, msg));
        }
        paired.push(pair(G2.negate(), sig));
        return Fp122.eql(pairingBatch(paired), Fp122.ONE);
      } catch {
        return false;
      }
    },
    // Adds a bunch of public key points together.
    // pk1 + pk2 + pk3 = pkA
    aggregatePublicKeys(publicKeys) {
      aNonEmpty(publicKeys);
      publicKeys = publicKeys.map((pub) => normPub(pub));
      const agg = publicKeys.reduce((sum, p2) => sum.add(p2), PubCurve.Point.ZERO);
      agg.assertValidity();
      return agg;
    },
    // Adds a bunch of signature points together.
    // pk1 + pk2 + pk3 = pkA
    aggregateSignatures(signatures) {
      aNonEmpty(signatures);
      signatures = signatures.map((sig) => normSig(sig));
      const agg = signatures.reduce((sum, s2) => sum.add(s2), SigCurve.Point.ZERO);
      agg.assertValidity();
      return agg;
    },
    hash(messageBytes, DST) {
      abytes(messageBytes);
      const opts = DST ? { DST } : void 0;
      return SigCurve.hashToCurve(messageBytes, opts);
    },
    Signature: SignatureCoder
  };
}
function bls(CURVE) {
  const { Fp: Fp3, Fr, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 } = CURVE.fields;
  const G1_ = weierstrassPoints(CURVE.G1);
  const G1 = Object.assign(G1_, createHasher(G1_.Point, CURVE.G1.mapToCurve, {
    ...CURVE.htfDefaults,
    ...CURVE.G1.htfDefaults
  }));
  const G2_ = weierstrassPoints(CURVE.G2);
  const G2 = Object.assign(G2_, createHasher(G2_.Point, CURVE.G2.mapToCurve, {
    ...CURVE.htfDefaults,
    ...CURVE.G2.htfDefaults
  }));
  const pairingRes = createBlsPairing(CURVE.fields, G1.Point, G2.Point, {
    ...CURVE.params,
    postPrecompute: CURVE.postPrecompute
  });
  const { millerLoopBatch, pairing, pairingBatch, calcPairingPrecomputes } = pairingRes;
  const longSignatures = createBlsSig(pairingRes, G1, G2, CURVE.G2.Signature, false);
  const shortSignatures = createBlsSig(pairingRes, G2, G1, CURVE.G1.ShortSignature, true);
  const rand = CURVE.randomBytes || randomBytes;
  const randomSecretKey = () => {
    const length = getMinHashLength(Fr.ORDER);
    return mapHashToField(rand(length), Fr.ORDER);
  };
  const utils = {
    randomSecretKey,
    randomPrivateKey: randomSecretKey,
    calcPairingPrecomputes
  };
  const { ShortSignature } = CURVE.G1;
  const { Signature } = CURVE.G2;
  function normP1Hash(point, htfOpts) {
    return point instanceof G1.Point ? point : shortSignatures.hash(ensureBytes("point", point), htfOpts == null ? void 0 : htfOpts.DST);
  }
  function normP2Hash(point, htfOpts) {
    return point instanceof G2.Point ? point : longSignatures.hash(ensureBytes("point", point), htfOpts == null ? void 0 : htfOpts.DST);
  }
  function getPublicKey(privateKey) {
    return longSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function getPublicKeyForShortSignatures(privateKey) {
    return shortSignatures.getPublicKey(privateKey).toBytes(true);
  }
  function sign(message, privateKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    const S2 = longSignatures.sign(Hm, privateKey);
    return message instanceof G2.Point ? S2 : Signature.toBytes(S2);
  }
  function signShortSignature(message, privateKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    const S2 = shortSignatures.sign(Hm, privateKey);
    return message instanceof G1.Point ? S2 : ShortSignature.toBytes(S2);
  }
  function verify(signature, message, publicKey, htfOpts) {
    const Hm = normP2Hash(message, htfOpts);
    return longSignatures.verify(signature, Hm, publicKey);
  }
  function verifyShortSignature(signature, message, publicKey, htfOpts) {
    const Hm = normP1Hash(message, htfOpts);
    return shortSignatures.verify(signature, Hm, publicKey);
  }
  function aggregatePublicKeys(publicKeys) {
    const agg = longSignatures.aggregatePublicKeys(publicKeys);
    return publicKeys[0] instanceof G1.Point ? agg : agg.toBytes(true);
  }
  function aggregateSignatures(signatures) {
    const agg = longSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G2.Point ? agg : Signature.toBytes(agg);
  }
  function aggregateShortSignatures(signatures) {
    const agg = shortSignatures.aggregateSignatures(signatures);
    return signatures[0] instanceof G1.Point ? agg : ShortSignature.toBytes(agg);
  }
  function verifyBatch(signature, messages, publicKeys, htfOpts) {
    const Hm = messages.map((m2) => normP2Hash(m2, htfOpts));
    return longSignatures.verifyBatch(signature, Hm, publicKeys);
  }
  G1.Point.BASE.precompute(4);
  return {
    longSignatures,
    shortSignatures,
    millerLoopBatch,
    pairing,
    pairingBatch,
    verifyBatch,
    fields: {
      Fr,
      Fp: Fp3,
      Fp2: Fp22,
      Fp6: Fp62,
      Fp12: Fp122
    },
    params: {
      ateLoopSize: CURVE.params.ateLoopSize,
      twistType: CURVE.params.twistType,
      // deprecated
      r: CURVE.params.r,
      G1b: CURVE.G1.b,
      G2b: CURVE.G2.b
    },
    utils,
    // deprecated
    getPublicKey,
    getPublicKeyForShortSignatures,
    sign,
    signShortSignature,
    verify,
    verifyShortSignature,
    aggregatePublicKeys,
    aggregateSignatures,
    aggregateShortSignatures,
    G1,
    G2,
    Signature,
    ShortSignature
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$2 = BigInt(0), _1n$3 = BigInt(1), _2n$3 = BigInt(2), _3n$1 = BigInt(3);
function calcFrobeniusCoefficients(Fp3, nonResidue, modulus, degree, num = 1, divisor) {
  const _divisor = BigInt(divisor === void 0 ? degree : divisor);
  const towerModulus = modulus ** BigInt(degree);
  const res = [];
  for (let i = 0; i < num; i++) {
    const a2 = BigInt(i + 1);
    const powers = [];
    for (let j2 = 0, qPower = _1n$3; j2 < degree; j2++) {
      const power = (a2 * qPower - a2) / _divisor % towerModulus;
      powers.push(Fp3.pow(nonResidue, power));
      qPower *= modulus;
    }
    res.push(powers);
  }
  return res;
}
function psiFrobenius(Fp3, Fp22, base) {
  const PSI_X = Fp22.pow(base, (Fp3.ORDER - _1n$3) / _3n$1);
  const PSI_Y = Fp22.pow(base, (Fp3.ORDER - _1n$3) / _2n$3);
  function psi(x2, y2) {
    const x22 = Fp22.mul(Fp22.frobeniusMap(x2, 1), PSI_X);
    const y22 = Fp22.mul(Fp22.frobeniusMap(y2, 1), PSI_Y);
    return [x22, y22];
  }
  const PSI2_X = Fp22.pow(base, (Fp3.ORDER ** _2n$3 - _1n$3) / _3n$1);
  const PSI2_Y = Fp22.pow(base, (Fp3.ORDER ** _2n$3 - _1n$3) / _2n$3);
  if (!Fp22.eql(PSI2_Y, Fp22.neg(Fp22.ONE)))
    throw new Error("psiFrobenius: PSI2_Y!==-1");
  function psi2(x2, y2) {
    return [Fp22.mul(x2, PSI2_X), Fp22.neg(y2)];
  }
  const mapAffine = (fn) => (c2, P2) => {
    const affine = P2.toAffine();
    const p2 = fn(affine.x, affine.y);
    return c2.fromAffine({ x: p2[0], y: p2[1] });
  };
  const G2psi3 = mapAffine(psi);
  const G2psi22 = mapAffine(psi2);
  return { psi, psi2, G2psi: G2psi3, G2psi2: G2psi22, PSI_X, PSI_Y, PSI2_X, PSI2_Y };
}
const Fp2fromBigTuple = (Fp3, tuple) => {
  if (tuple.length !== 2)
    throw new Error("invalid tuple");
  const fps = tuple.map((n) => Fp3.create(n));
  return { c0: fps[0], c1: fps[1] };
};
class _Field2 {
  constructor(Fp3, opts = {}) {
    this.MASK = _1n$3;
    const ORDER = Fp3.ORDER;
    const FP2_ORDER = ORDER * ORDER;
    this.Fp = Fp3;
    this.ORDER = FP2_ORDER;
    this.BITS = bitLen(FP2_ORDER);
    this.BYTES = Math.ceil(bitLen(FP2_ORDER) / 8);
    this.isLE = Fp3.isLE;
    this.ZERO = { c0: Fp3.ZERO, c1: Fp3.ZERO };
    this.ONE = { c0: Fp3.ONE, c1: Fp3.ZERO };
    this.Fp_NONRESIDUE = Fp3.create(opts.NONRESIDUE || BigInt(-1));
    this.Fp_div2 = Fp3.div(Fp3.ONE, _2n$3);
    this.NONRESIDUE = Fp2fromBigTuple(Fp3, opts.FP2_NONRESIDUE);
    this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp3, this.Fp_NONRESIDUE, Fp3.ORDER, 2)[0];
    this.mulByB = opts.Fp2mulByB;
    Object.seal(this);
  }
  fromBigTuple(tuple) {
    return Fp2fromBigTuple(this.Fp, tuple);
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1 }) {
    function isValidC(num, ORDER) {
      return typeof num === "bigint" && _0n$2 <= num && num < ORDER;
    }
    return isValidC(c0, this.ORDER) && isValidC(c1, this.ORDER);
  }
  is0({ c0, c1 }) {
    return this.Fp.is0(c0) && this.Fp.is0(c1);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  eql({ c0, c1 }, { c0: r0, c1: r1 }) {
    return this.Fp.eql(c0, r0) && this.Fp.eql(c1, r1);
  }
  neg({ c0, c1 }) {
    return { c0: this.Fp.neg(c0), c1: this.Fp.neg(c1) };
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  // Normalized
  add(f1, f2) {
    const { c0, c1 } = f1;
    const { c0: r0, c1: r1 } = f2;
    return {
      c0: this.Fp.add(c0, r0),
      c1: this.Fp.add(c1, r1)
    };
  }
  sub({ c0, c1 }, { c0: r0, c1: r1 }) {
    return {
      c0: this.Fp.sub(c0, r0),
      c1: this.Fp.sub(c1, r1)
    };
  }
  mul({ c0, c1 }, rhs) {
    const { Fp: Fp3 } = this;
    if (typeof rhs === "bigint")
      return { c0: Fp3.mul(c0, rhs), c1: Fp3.mul(c1, rhs) };
    const { c0: r0, c1: r1 } = rhs;
    let t1 = Fp3.mul(c0, r0);
    let t2 = Fp3.mul(c1, r1);
    const o0 = Fp3.sub(t1, t2);
    const o1 = Fp3.sub(Fp3.mul(Fp3.add(c0, c1), Fp3.add(r0, r1)), Fp3.add(t1, t2));
    return { c0: o0, c1: o1 };
  }
  sqr({ c0, c1 }) {
    const { Fp: Fp3 } = this;
    const a2 = Fp3.add(c0, c1);
    const b2 = Fp3.sub(c0, c1);
    const c2 = Fp3.add(c0, c0);
    return { c0: Fp3.mul(a2, b2), c1: Fp3.mul(c2, c1) };
  }
  // NonNormalized stuff
  addN(a2, b2) {
    return this.add(a2, b2);
  }
  subN(a2, b2) {
    return this.sub(a2, b2);
  }
  mulN(a2, b2) {
    return this.mul(a2, b2);
  }
  sqrN(a2) {
    return this.sqr(a2);
  }
  // Why inversion for bigint inside Fp instead of Fp2? it is even used in that context?
  div(lhs, rhs) {
    const { Fp: Fp3 } = this;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  inv({ c0: a2, c1: b2 }) {
    const { Fp: Fp3 } = this;
    const factor = Fp3.inv(Fp3.create(a2 * a2 + b2 * b2));
    return { c0: Fp3.mul(factor, Fp3.create(a2)), c1: Fp3.mul(factor, Fp3.create(-b2)) };
  }
  sqrt(num) {
    const { Fp: Fp3 } = this;
    const Fp22 = this;
    const { c0, c1 } = num;
    if (Fp3.is0(c1)) {
      if (FpLegendre(Fp3, c0) === 1)
        return Fp22.create({ c0: Fp3.sqrt(c0), c1: Fp3.ZERO });
      else
        return Fp22.create({ c0: Fp3.ZERO, c1: Fp3.sqrt(Fp3.div(c0, this.Fp_NONRESIDUE)) });
    }
    const a2 = Fp3.sqrt(Fp3.sub(Fp3.sqr(c0), Fp3.mul(Fp3.sqr(c1), this.Fp_NONRESIDUE)));
    let d2 = Fp3.mul(Fp3.add(a2, c0), this.Fp_div2);
    const legendre = FpLegendre(Fp3, d2);
    if (legendre === -1)
      d2 = Fp3.sub(d2, a2);
    const a0 = Fp3.sqrt(d2);
    const candidateSqrt = Fp22.create({ c0: a0, c1: Fp3.div(Fp3.mul(c1, this.Fp_div2), a0) });
    if (!Fp22.eql(Fp22.sqr(candidateSqrt), num))
      throw new Error("Cannot find square root");
    const x1 = candidateSqrt;
    const x2 = Fp22.neg(x1);
    const { re: re1, im: im1 } = Fp22.reim(x1);
    const { re: re2, im: im2 } = Fp22.reim(x2);
    if (im1 > im2 || im1 === im2 && re1 > re2)
      return x1;
    return x2;
  }
  // Same as sgn0_m_eq_2 in RFC 9380
  isOdd(x2) {
    const { re: x0, im: x1 } = this.reim(x2);
    const sign_0 = x0 % _2n$3;
    const zero_0 = x0 === _0n$2;
    const sign_1 = x1 % _2n$3;
    return BigInt(sign_0 || zero_0 && sign_1) == _1n$3;
  }
  // Bytes util
  fromBytes(b2) {
    const { Fp: Fp3 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    return { c0: Fp3.fromBytes(b2.subarray(0, Fp3.BYTES)), c1: Fp3.fromBytes(b2.subarray(Fp3.BYTES)) };
  }
  toBytes({ c0, c1 }) {
    return concatBytes(this.Fp.toBytes(c0), this.Fp.toBytes(c1));
  }
  cmov({ c0, c1 }, { c0: r0, c1: r1 }, c2) {
    return {
      c0: this.Fp.cmov(c0, r0, c2),
      c1: this.Fp.cmov(c1, r1, c2)
    };
  }
  reim({ c0, c1 }) {
    return { re: c0, im: c1 };
  }
  Fp4Square(a2, b2) {
    const Fp22 = this;
    const a22 = Fp22.sqr(a2);
    const b22 = Fp22.sqr(b2);
    return {
      first: Fp22.add(Fp22.mulByNonresidue(b22), a22),
      // b² * Nonresidue + a²
      second: Fp22.sub(Fp22.sub(Fp22.sqr(Fp22.add(a2, b2)), a22), b22)
      // (a + b)² - a² - b²
    };
  }
  // multiply by u + 1
  mulByNonresidue({ c0, c1 }) {
    return this.mul({ c0, c1 }, this.NONRESIDUE);
  }
  frobeniusMap({ c0, c1 }, power) {
    return {
      c0,
      c1: this.Fp.mul(c1, this.FROBENIUS_COEFFICIENTS[power % 2])
    };
  }
}
class _Field6 {
  constructor(Fp22) {
    this.MASK = _1n$3;
    this.Fp2 = Fp22;
    this.ORDER = Fp22.ORDER;
    this.BITS = 3 * Fp22.BITS;
    this.BYTES = 3 * Fp22.BYTES;
    this.isLE = Fp22.isLE;
    this.ZERO = { c0: Fp22.ZERO, c1: Fp22.ZERO, c2: Fp22.ZERO };
    this.ONE = { c0: Fp22.ONE, c1: Fp22.ZERO, c2: Fp22.ZERO };
    const { Fp: Fp3 } = Fp22;
    const frob = calcFrobeniusCoefficients(Fp22, Fp22.NONRESIDUE, Fp3.ORDER, 6, 2, 3);
    this.FROBENIUS_COEFFICIENTS_1 = frob[0];
    this.FROBENIUS_COEFFICIENTS_2 = frob[1];
    Object.seal(this);
  }
  add({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.add(c0, r0),
      c1: Fp22.add(c1, r1),
      c2: Fp22.add(c2, r2)
    };
  }
  sub({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.sub(c0, r0),
      c1: Fp22.sub(c1, r1),
      c2: Fp22.sub(c2, r2)
    };
  }
  mul({ c0, c1, c2 }, rhs) {
    const { Fp2: Fp22 } = this;
    if (typeof rhs === "bigint") {
      return {
        c0: Fp22.mul(c0, rhs),
        c1: Fp22.mul(c1, rhs),
        c2: Fp22.mul(c2, rhs)
      };
    }
    const { c0: r0, c1: r1, c2: r2 } = rhs;
    const t0 = Fp22.mul(c0, r0);
    const t1 = Fp22.mul(c1, r1);
    const t2 = Fp22.mul(c2, r2);
    return {
      // t0 + (c1 + c2) * (r1 * r2) - (T1 + T2) * (u + 1)
      c0: Fp22.add(t0, Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), Fp22.add(r1, r2)), Fp22.add(t1, t2)))),
      // (c0 + c1) * (r0 + r1) - (T0 + T1) + T2 * (u + 1)
      c1: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c1), Fp22.add(r0, r1)), Fp22.add(t0, t1)), Fp22.mulByNonresidue(t2)),
      // T1 + (c0 + c2) * (r0 + r2) - T0 + T2
      c2: Fp22.sub(Fp22.add(t1, Fp22.mul(Fp22.add(c0, c2), Fp22.add(r0, r2))), Fp22.add(t0, t2))
    };
  }
  sqr({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.sqr(c0);
    let t1 = Fp22.mul(Fp22.mul(c0, c1), _2n$3);
    let t3 = Fp22.mul(Fp22.mul(c1, c2), _2n$3);
    let t4 = Fp22.sqr(c2);
    return {
      c0: Fp22.add(Fp22.mulByNonresidue(t3), t0),
      // T3 * (u + 1) + T0
      c1: Fp22.add(Fp22.mulByNonresidue(t4), t1),
      // T4 * (u + 1) + T1
      // T1 + (c0 - c1 + c2)² + T3 - T0 - T4
      c2: Fp22.sub(Fp22.sub(Fp22.add(Fp22.add(t1, Fp22.sqr(Fp22.add(Fp22.sub(c0, c1), c2))), t3), t0), t4)
    };
  }
  addN(a2, b2) {
    return this.add(a2, b2);
  }
  subN(a2, b2) {
    return this.sub(a2, b2);
  }
  mulN(a2, b2) {
    return this.mul(a2, b2);
  }
  sqrN(a2) {
    return this.sqr(a2);
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.isValid(c0) && Fp22.isValid(c1) && Fp22.isValid(c2);
  }
  is0({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.is0(c0) && Fp22.is0(c1) && Fp22.is0(c2);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  neg({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return { c0: Fp22.neg(c0), c1: Fp22.neg(c1), c2: Fp22.neg(c2) };
  }
  eql({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }) {
    const { Fp2: Fp22 } = this;
    return Fp22.eql(c0, r0) && Fp22.eql(c1, r1) && Fp22.eql(c2, r2);
  }
  sqrt(_2) {
    return notImplemented();
  }
  // Do we need division by bigint at all? Should be done via order:
  div(lhs, rhs) {
    const { Fp2: Fp22 } = this;
    const { Fp: Fp3 } = Fp22;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  inv({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.sub(Fp22.sqr(c0), Fp22.mulByNonresidue(Fp22.mul(c2, c1)));
    let t1 = Fp22.sub(Fp22.mulByNonresidue(Fp22.sqr(c2)), Fp22.mul(c0, c1));
    let t2 = Fp22.sub(Fp22.sqr(c1), Fp22.mul(c0, c2));
    let t4 = Fp22.inv(Fp22.add(Fp22.mulByNonresidue(Fp22.add(Fp22.mul(c2, t1), Fp22.mul(c1, t2))), Fp22.mul(c0, t0)));
    return { c0: Fp22.mul(t4, t0), c1: Fp22.mul(t4, t1), c2: Fp22.mul(t4, t2) };
  }
  // Bytes utils
  fromBytes(b2) {
    const { Fp2: Fp22 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    const B2 = Fp22.BYTES;
    return {
      c0: Fp22.fromBytes(b2.subarray(0, B2)),
      c1: Fp22.fromBytes(b2.subarray(B2, B2 * 2)),
      c2: Fp22.fromBytes(b2.subarray(2 * B2))
    };
  }
  toBytes({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return concatBytes(Fp22.toBytes(c0), Fp22.toBytes(c1), Fp22.toBytes(c2));
  }
  cmov({ c0, c1, c2 }, { c0: r0, c1: r1, c2: r2 }, c3) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.cmov(c0, r0, c3),
      c1: Fp22.cmov(c1, r1, c3),
      c2: Fp22.cmov(c2, r2, c3)
    };
  }
  fromBigSix(t) {
    const { Fp2: Fp22 } = this;
    if (!Array.isArray(t) || t.length !== 6)
      throw new Error("invalid Fp6 usage");
    return {
      c0: Fp22.fromBigTuple(t.slice(0, 2)),
      c1: Fp22.fromBigTuple(t.slice(2, 4)),
      c2: Fp22.fromBigTuple(t.slice(4, 6))
    };
  }
  frobeniusMap({ c0, c1, c2 }, power) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.frobeniusMap(c0, power),
      c1: Fp22.mul(Fp22.frobeniusMap(c1, power), this.FROBENIUS_COEFFICIENTS_1[power % 6]),
      c2: Fp22.mul(Fp22.frobeniusMap(c2, power), this.FROBENIUS_COEFFICIENTS_2[power % 6])
    };
  }
  mulByFp2({ c0, c1, c2 }, rhs) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.mul(c0, rhs),
      c1: Fp22.mul(c1, rhs),
      c2: Fp22.mul(c2, rhs)
    };
  }
  mulByNonresidue({ c0, c1, c2 }) {
    const { Fp2: Fp22 } = this;
    return { c0: Fp22.mulByNonresidue(c2), c1: c0, c2: c1 };
  }
  // Sparse multiplication
  mul1({ c0, c1, c2 }, b1) {
    const { Fp2: Fp22 } = this;
    return {
      c0: Fp22.mulByNonresidue(Fp22.mul(c2, b1)),
      c1: Fp22.mul(c0, b1),
      c2: Fp22.mul(c1, b1)
    };
  }
  // Sparse multiplication
  mul01({ c0, c1, c2 }, b0, b1) {
    const { Fp2: Fp22 } = this;
    let t0 = Fp22.mul(c0, b0);
    let t1 = Fp22.mul(c1, b1);
    return {
      // ((c1 + c2) * b1 - T1) * (u + 1) + T0
      c0: Fp22.add(Fp22.mulByNonresidue(Fp22.sub(Fp22.mul(Fp22.add(c1, c2), b1), t1)), t0),
      // (b0 + b1) * (c0 + c1) - T0 - T1
      c1: Fp22.sub(Fp22.sub(Fp22.mul(Fp22.add(b0, b1), Fp22.add(c0, c1)), t0), t1),
      // (c0 + c2) * b0 - T0 + T1
      c2: Fp22.add(Fp22.sub(Fp22.mul(Fp22.add(c0, c2), b0), t0), t1)
    };
  }
}
class _Field12 {
  constructor(Fp62, opts) {
    this.MASK = _1n$3;
    const { Fp2: Fp22 } = Fp62;
    const { Fp: Fp3 } = Fp22;
    this.Fp6 = Fp62;
    this.ORDER = Fp22.ORDER;
    this.BITS = 2 * Fp62.BITS;
    this.BYTES = 2 * Fp62.BYTES;
    this.isLE = Fp62.isLE;
    this.ZERO = { c0: Fp62.ZERO, c1: Fp62.ZERO };
    this.ONE = { c0: Fp62.ONE, c1: Fp62.ZERO };
    this.FROBENIUS_COEFFICIENTS = calcFrobeniusCoefficients(Fp22, Fp22.NONRESIDUE, Fp3.ORDER, 12, 1, 6)[0];
    this.X_LEN = opts.X_LEN;
    this.finalExponentiate = opts.Fp12finalExponentiate;
  }
  create(num) {
    return num;
  }
  isValid({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.isValid(c0) && Fp62.isValid(c1);
  }
  is0({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.is0(c0) && Fp62.is0(c1);
  }
  isValidNot0(num) {
    return !this.is0(num) && this.isValid(num);
  }
  neg({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return { c0: Fp62.neg(c0), c1: Fp62.neg(c1) };
  }
  eql({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return Fp62.eql(c0, r0) && Fp62.eql(c1, r1);
  }
  sqrt(_2) {
    notImplemented();
  }
  inv({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    let t = Fp62.inv(Fp62.sub(Fp62.sqr(c0), Fp62.mulByNonresidue(Fp62.sqr(c1))));
    return { c0: Fp62.mul(c0, t), c1: Fp62.neg(Fp62.mul(c1, t)) };
  }
  div(lhs, rhs) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { Fp: Fp3 } = Fp22;
    return this.mul(lhs, typeof rhs === "bigint" ? Fp3.inv(Fp3.create(rhs)) : this.inv(rhs));
  }
  pow(num, power) {
    return FpPow(this, num, power);
  }
  invertBatch(nums) {
    return FpInvertBatch(this, nums);
  }
  // Normalized
  add({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.add(c0, r0),
      c1: Fp62.add(c1, r1)
    };
  }
  sub({ c0, c1 }, { c0: r0, c1: r1 }) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.sub(c0, r0),
      c1: Fp62.sub(c1, r1)
    };
  }
  mul({ c0, c1 }, rhs) {
    const { Fp6: Fp62 } = this;
    if (typeof rhs === "bigint")
      return { c0: Fp62.mul(c0, rhs), c1: Fp62.mul(c1, rhs) };
    let { c0: r0, c1: r1 } = rhs;
    let t1 = Fp62.mul(c0, r0);
    let t2 = Fp62.mul(c1, r1);
    return {
      c0: Fp62.add(t1, Fp62.mulByNonresidue(t2)),
      // T1 + T2 * v
      // (c0 + c1) * (r0 + r1) - (T1 + T2)
      c1: Fp62.sub(Fp62.mul(Fp62.add(c0, c1), Fp62.add(r0, r1)), Fp62.add(t1, t2))
    };
  }
  sqr({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    let ab = Fp62.mul(c0, c1);
    return {
      // (c1 * v + c0) * (c0 + c1) - AB - AB * v
      c0: Fp62.sub(Fp62.sub(Fp62.mul(Fp62.add(Fp62.mulByNonresidue(c1), c0), Fp62.add(c0, c1)), ab), Fp62.mulByNonresidue(ab)),
      c1: Fp62.add(ab, ab)
    };
  }
  // NonNormalized stuff
  addN(a2, b2) {
    return this.add(a2, b2);
  }
  subN(a2, b2) {
    return this.sub(a2, b2);
  }
  mulN(a2, b2) {
    return this.mul(a2, b2);
  }
  sqrN(a2) {
    return this.sqr(a2);
  }
  // Bytes utils
  fromBytes(b2) {
    const { Fp6: Fp62 } = this;
    if (b2.length !== this.BYTES)
      throw new Error("fromBytes invalid length=" + b2.length);
    return {
      c0: Fp62.fromBytes(b2.subarray(0, Fp62.BYTES)),
      c1: Fp62.fromBytes(b2.subarray(Fp62.BYTES))
    };
  }
  toBytes({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    return concatBytes(Fp62.toBytes(c0), Fp62.toBytes(c1));
  }
  cmov({ c0, c1 }, { c0: r0, c1: r1 }, c2) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.cmov(c0, r0, c2),
      c1: Fp62.cmov(c1, r1, c2)
    };
  }
  // Utils
  // toString() {
  //   return '' + 'Fp12(' + this.c0 + this.c1 + '* w');
  // },
  // fromTuple(c: [Fp6, Fp6]) {
  //   return new Fp12(...c);
  // }
  fromBigTwelve(t) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.fromBigSix(t.slice(0, 6)),
      c1: Fp62.fromBigSix(t.slice(6, 12))
    };
  }
  // Raises to q**i -th power
  frobeniusMap(lhs, power) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { c0, c1, c2 } = Fp62.frobeniusMap(lhs.c1, power);
    const coeff = this.FROBENIUS_COEFFICIENTS[power % 12];
    return {
      c0: Fp62.frobeniusMap(lhs.c0, power),
      c1: Fp62.create({
        c0: Fp22.mul(c0, coeff),
        c1: Fp22.mul(c1, coeff),
        c2: Fp22.mul(c2, coeff)
      })
    };
  }
  mulByFp2({ c0, c1 }, rhs) {
    const { Fp6: Fp62 } = this;
    return {
      c0: Fp62.mulByFp2(c0, rhs),
      c1: Fp62.mulByFp2(c1, rhs)
    };
  }
  conjugate({ c0, c1 }) {
    return { c0, c1: this.Fp6.neg(c1) };
  }
  // Sparse multiplication
  mul014({ c0, c1 }, o0, o1, o4) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    let t0 = Fp62.mul01(c0, o0, o1);
    let t1 = Fp62.mul1(c1, o4);
    return {
      c0: Fp62.add(Fp62.mulByNonresidue(t1), t0),
      // T1 * v + T0
      // (c1 + c0) * [o0, o1+o4] - T0 - T1
      c1: Fp62.sub(Fp62.sub(Fp62.mul01(Fp62.add(c1, c0), o0, Fp22.add(o1, o4)), t0), t1)
    };
  }
  mul034({ c0, c1 }, o0, o3, o4) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const a2 = Fp62.create({
      c0: Fp22.mul(c0.c0, o0),
      c1: Fp22.mul(c0.c1, o0),
      c2: Fp22.mul(c0.c2, o0)
    });
    const b2 = Fp62.mul01(c1, o3, o4);
    const e = Fp62.mul01(Fp62.add(c0, c1), Fp22.add(o0, o3), o4);
    return {
      c0: Fp62.add(Fp62.mulByNonresidue(b2), a2),
      c1: Fp62.sub(e, Fp62.add(a2, b2))
    };
  }
  // A cyclotomic group is a subgroup of Fp^n defined by
  //   GΦₙ(p) = {α ∈ Fpⁿ : α^Φₙ(p) = 1}
  // The result of any pairing is in a cyclotomic subgroup
  // https://eprint.iacr.org/2009/565.pdf
  // https://eprint.iacr.org/2010/354.pdf
  _cyclotomicSquare({ c0, c1 }) {
    const { Fp6: Fp62 } = this;
    const { Fp2: Fp22 } = Fp62;
    const { c0: c0c0, c1: c0c1, c2: c0c2 } = c0;
    const { c0: c1c0, c1: c1c1, c2: c1c2 } = c1;
    const { first: t3, second: t4 } = Fp22.Fp4Square(c0c0, c1c1);
    const { first: t5, second: t6 } = Fp22.Fp4Square(c1c0, c0c2);
    const { first: t7, second: t8 } = Fp22.Fp4Square(c0c1, c1c2);
    const t9 = Fp22.mulByNonresidue(t8);
    return {
      c0: Fp62.create({
        c0: Fp22.add(Fp22.mul(Fp22.sub(t3, c0c0), _2n$3), t3),
        // 2 * (T3 - c0c0)  + T3
        c1: Fp22.add(Fp22.mul(Fp22.sub(t5, c0c1), _2n$3), t5),
        // 2 * (T5 - c0c1)  + T5
        c2: Fp22.add(Fp22.mul(Fp22.sub(t7, c0c2), _2n$3), t7)
      }),
      // 2 * (T7 - c0c2)  + T7
      c1: Fp62.create({
        c0: Fp22.add(Fp22.mul(Fp22.add(t9, c1c0), _2n$3), t9),
        // 2 * (T9 + c1c0) + T9
        c1: Fp22.add(Fp22.mul(Fp22.add(t4, c1c1), _2n$3), t4),
        // 2 * (T4 + c1c1) + T4
        c2: Fp22.add(Fp22.mul(Fp22.add(t6, c1c2), _2n$3), t6)
      })
    };
  }
  // https://eprint.iacr.org/2009/565.pdf
  _cyclotomicExp(num, n) {
    let z2 = this.ONE;
    for (let i = this.X_LEN - 1; i >= 0; i--) {
      z2 = this._cyclotomicSquare(z2);
      if (bitGet(n, i))
        z2 = this.mul(z2, num);
    }
    return z2;
  }
}
function tower12(opts) {
  const Fp3 = Field(opts.ORDER);
  const Fp22 = new _Field2(Fp3, opts);
  const Fp62 = new _Field6(Fp22);
  const Fp122 = new _Field12(Fp62, opts);
  return { Fp: Fp3, Fp2: Fp22, Fp6: Fp62, Fp12: Fp122 };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n$1 = BigInt(0), _1n$2 = BigInt(1), _2n$2 = BigInt(2), _3n = BigInt(3), _4n = BigInt(4);
const BLS_X = BigInt("0xd201000000010000");
const BLS_X_LEN = bitLen(BLS_X);
const bls12_381_CURVE_G1 = {
  p: BigInt("0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaaab"),
  n: BigInt("0x73eda753299d7d483339d80809a1d80553bda402fffe5bfeffffffff00000001"),
  h: BigInt("0x396c8c005555e1568c00aaab0000aaab"),
  a: _0n$1,
  b: _4n,
  Gx: BigInt("0x17f1d3a73197d7942695638c4fa9ac0fc3688c4f9774b905a14e3a3f171bac586c55e83ff97a1aeffb3af00adb22c6bb"),
  Gy: BigInt("0x08b3f481e3aaa0f1a09e30ed741d8ae4fcf5e095d5d00af600db18cb2c04b3edd03cc744a2888ae40caa232946c5e7e1")
};
const bls12_381_Fr = Field(bls12_381_CURVE_G1.n, {
  modFromBytes: true,
  isLE: true
});
const { Fp: Fp$1, Fp2, Fp6, Fp12 } = tower12({
  ORDER: bls12_381_CURVE_G1.p,
  X_LEN: BLS_X_LEN,
  // Finite extension field over irreducible polynominal.
  // Fp(u) / (u² - β) where β = -1
  FP2_NONRESIDUE: [_1n$2, _1n$2],
  Fp2mulByB: ({ c0, c1 }) => {
    const t0 = Fp$1.mul(c0, _4n);
    const t1 = Fp$1.mul(c1, _4n);
    return { c0: Fp$1.sub(t0, t1), c1: Fp$1.add(t0, t1) };
  },
  Fp12finalExponentiate: (num) => {
    const x2 = BLS_X;
    const t0 = Fp12.div(Fp12.frobeniusMap(num, 6), num);
    const t1 = Fp12.mul(Fp12.frobeniusMap(t0, 2), t0);
    const t2 = Fp12.conjugate(Fp12._cyclotomicExp(t1, x2));
    const t3 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicSquare(t1)), t2);
    const t4 = Fp12.conjugate(Fp12._cyclotomicExp(t3, x2));
    const t5 = Fp12.conjugate(Fp12._cyclotomicExp(t4, x2));
    const t6 = Fp12.mul(Fp12.conjugate(Fp12._cyclotomicExp(t5, x2)), Fp12._cyclotomicSquare(t2));
    const t7 = Fp12.conjugate(Fp12._cyclotomicExp(t6, x2));
    const t2_t5_pow_q2 = Fp12.frobeniusMap(Fp12.mul(t2, t5), 2);
    const t4_t1_pow_q3 = Fp12.frobeniusMap(Fp12.mul(t4, t1), 3);
    const t6_t1c_pow_q1 = Fp12.frobeniusMap(Fp12.mul(t6, Fp12.conjugate(t1)), 1);
    const t7_t3c_t1 = Fp12.mul(Fp12.mul(t7, Fp12.conjugate(t3)), t1);
    return Fp12.mul(Fp12.mul(Fp12.mul(t2_t5_pow_q2, t4_t1_pow_q3), t6_t1c_pow_q1), t7_t3c_t1);
  }
});
const { G2psi, G2psi2 } = psiFrobenius(Fp$1, Fp2, Fp2.div(Fp2.ONE, Fp2.NONRESIDUE));
const htfDefaults = Object.freeze({
  DST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  encodeDST: "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_NUL_",
  p: Fp$1.ORDER,
  m: 2,
  k: 128,
  expand: "xmd",
  hash: sha256
});
const bls12_381_CURVE_G2 = {
  p: Fp2.ORDER,
  n: bls12_381_CURVE_G1.n,
  h: BigInt("0x5d543a95414e7f1091d50792876a202cd91de4547085abaa68a205b2e5a7ddfa628f1cb4d9e82ef21537e293a6691ae1616ec6e786f0c70cf1c38e31c7238e5"),
  a: Fp2.ZERO,
  b: Fp2.fromBigTuple([_4n, _4n]),
  Gx: Fp2.fromBigTuple([
    BigInt("0x024aa2b2f08f0a91260805272dc51051c6e47ad4fa403b02b4510b647ae3d1770bac0326a805bbefd48056c8c121bdb8"),
    BigInt("0x13e02b6052719f607dacd3a088274f65596bd0d09920b61ab5da61bbdc7f5049334cf11213945d57e5ac7d055d042b7e")
  ]),
  Gy: Fp2.fromBigTuple([
    BigInt("0x0ce5d527727d6e118cc9cdc6da2e351aadfd9baa8cbdd3a76d429a695160d12c923ac9cc3baca289e193548608b82801"),
    BigInt("0x0606c4a02ea734cc32acd2b02bc28b99cb3e287e85a763af267492ab572e99ab3f370d275cec1da1aaa9075ff05f79be")
  ])
};
const COMPZERO = setMask(Fp$1.toBytes(_0n$1), { infinity: true, compressed: true });
function parseMask(bytes) {
  bytes = bytes.slice();
  const mask = bytes[0] & 224;
  const compressed = !!(mask >> 7 & 1);
  const infinity = !!(mask >> 6 & 1);
  const sort = !!(mask >> 5 & 1);
  bytes[0] &= 31;
  return { compressed, infinity, sort, value: bytes };
}
function setMask(bytes, mask) {
  if (bytes[0] & 224)
    throw new Error("setMask: non-empty mask");
  if (mask.compressed)
    bytes[0] |= 128;
  if (mask.infinity)
    bytes[0] |= 64;
  if (mask.sort)
    bytes[0] |= 32;
  return bytes;
}
function pointG1ToBytes(_c, point, isComp) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const is0 = point.is0();
  const { x: x2, y: y2 } = point.toAffine();
  if (isComp) {
    if (is0)
      return COMPZERO.slice();
    const sort = Boolean(y2 * _2n$2 / P2);
    return setMask(numberToBytesBE(x2, L2), { compressed: true, sort });
  } else {
    if (is0) {
      return concatBytes(Uint8Array.of(64), new Uint8Array(2 * L2 - 1));
    } else {
      return concatBytes(numberToBytesBE(x2, L2), numberToBytesBE(y2, L2));
    }
  }
}
function signatureG1ToBytes(point) {
  point.assertValidity();
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const { x: x2, y: y2 } = point.toAffine();
  if (point.is0())
    return COMPZERO.slice();
  const sort = Boolean(y2 * _2n$2 / P2);
  return setMask(numberToBytesBE(x2, L2), { compressed: true, sort });
}
function pointG1FromBytes(bytes) {
  const { compressed, infinity, sort, value } = parseMask(bytes);
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  if (value.length === 48 && compressed) {
    const compressedValue = bytesToNumberBE(value);
    const x2 = Fp$1.create(compressedValue & bitMask(Fp$1.BITS));
    if (infinity) {
      if (x2 !== _0n$1)
        throw new Error("invalid G1 point: non-empty, at infinity, with compression");
      return { x: _0n$1, y: _0n$1 };
    }
    const right = Fp$1.add(Fp$1.pow(x2, _3n), Fp$1.create(bls12_381_CURVE_G1.b));
    let y2 = Fp$1.sqrt(right);
    if (!y2)
      throw new Error("invalid G1 point: compressed point");
    if (y2 * _2n$2 / P2 !== BigInt(sort))
      y2 = Fp$1.neg(y2);
    return { x: Fp$1.create(x2), y: Fp$1.create(y2) };
  } else if (value.length === 96 && !compressed) {
    const x2 = bytesToNumberBE(value.subarray(0, L2));
    const y2 = bytesToNumberBE(value.subarray(L2));
    if (infinity) {
      if (x2 !== _0n$1 || y2 !== _0n$1)
        throw new Error("G1: non-empty point at infinity");
      return bls12_381.G1.Point.ZERO.toAffine();
    }
    return { x: Fp$1.create(x2), y: Fp$1.create(y2) };
  } else {
    throw new Error("invalid G1 point: expected 48/96 bytes");
  }
}
function signatureG1FromBytes(hex) {
  const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex, 48));
  const P2 = Fp$1.ORDER;
  const Point = bls12_381.G1.Point;
  const compressedValue = bytesToNumberBE(value);
  if (infinity)
    return Point.ZERO;
  const x2 = Fp$1.create(compressedValue & bitMask(Fp$1.BITS));
  const right = Fp$1.add(Fp$1.pow(x2, _3n), Fp$1.create(bls12_381_CURVE_G1.b));
  let y2 = Fp$1.sqrt(right);
  if (!y2)
    throw new Error("invalid G1 point: compressed");
  const aflag = BigInt(sort);
  if (y2 * _2n$2 / P2 !== aflag)
    y2 = Fp$1.neg(y2);
  const point = Point.fromAffine({ x: x2, y: y2 });
  point.assertValidity();
  return point;
}
function pointG2ToBytes(_c, point, isComp) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const is0 = point.is0();
  const { x: x2, y: y2 } = point.toAffine();
  if (isComp) {
    if (is0)
      return concatBytes(COMPZERO, numberToBytesBE(_0n$1, L2));
    const flag = Boolean(y2.c1 === _0n$1 ? y2.c0 * _2n$2 / P2 : y2.c1 * _2n$2 / P2);
    return concatBytes(setMask(numberToBytesBE(x2.c1, L2), { compressed: true, sort: flag }), numberToBytesBE(x2.c0, L2));
  } else {
    if (is0)
      return concatBytes(Uint8Array.of(64), new Uint8Array(4 * L2 - 1));
    const { re: x0, im: x1 } = Fp2.reim(x2);
    const { re: y0, im: y1 } = Fp2.reim(y2);
    return concatBytes(numberToBytesBE(x1, L2), numberToBytesBE(x0, L2), numberToBytesBE(y1, L2), numberToBytesBE(y0, L2));
  }
}
function signatureG2ToBytes(point) {
  point.assertValidity();
  const { BYTES: L2 } = Fp$1;
  if (point.is0())
    return concatBytes(COMPZERO, numberToBytesBE(_0n$1, L2));
  const { x: x2, y: y2 } = point.toAffine();
  const { re: x0, im: x1 } = Fp2.reim(x2);
  const { re: y0, im: y1 } = Fp2.reim(y2);
  const tmp = y1 > _0n$1 ? y1 * _2n$2 : y0 * _2n$2;
  const sort = Boolean(tmp / Fp$1.ORDER & _1n$2);
  const z2 = x0;
  return concatBytes(setMask(numberToBytesBE(x1, L2), { sort, compressed: true }), numberToBytesBE(z2, L2));
}
function pointG2FromBytes(bytes) {
  const { BYTES: L2, ORDER: P2 } = Fp$1;
  const { compressed, infinity, sort, value } = parseMask(bytes);
  if (!compressed && !infinity && sort || // 00100000
  !compressed && infinity && sort || // 01100000
  sort && infinity && compressed) {
    throw new Error("invalid encoding flag: " + (bytes[0] & 224));
  }
  const slc = (b2, from, to) => bytesToNumberBE(b2.slice(from, to));
  if (value.length === 96 && compressed) {
    if (infinity) {
      if (value.reduce((p2, c2) => p2 !== 0 ? c2 + 1 : c2, 0) > 0) {
        throw new Error("invalid G2 point: compressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x_1 = slc(value, 0, L2);
    const x_0 = slc(value, L2, 2 * L2);
    const x2 = Fp2.create({ c0: Fp$1.create(x_0), c1: Fp$1.create(x_1) });
    const right = Fp2.add(Fp2.pow(x2, _3n), bls12_381_CURVE_G2.b);
    let y2 = Fp2.sqrt(right);
    const Y_bit = y2.c1 === _0n$1 ? y2.c0 * _2n$2 / P2 : y2.c1 * _2n$2 / P2 ? _1n$2 : _0n$1;
    y2 = sort && Y_bit > 0 ? y2 : Fp2.neg(y2);
    return { x: x2, y: y2 };
  } else if (value.length === 192 && !compressed) {
    if (infinity) {
      if (value.reduce((p2, c2) => p2 !== 0 ? c2 + 1 : c2, 0) > 0) {
        throw new Error("invalid G2 point: uncompressed");
      }
      return { x: Fp2.ZERO, y: Fp2.ZERO };
    }
    const x1 = slc(value, 0 * L2, 1 * L2);
    const x0 = slc(value, 1 * L2, 2 * L2);
    const y1 = slc(value, 2 * L2, 3 * L2);
    const y0 = slc(value, 3 * L2, 4 * L2);
    return { x: Fp2.fromBigTuple([x0, x1]), y: Fp2.fromBigTuple([y0, y1]) };
  } else {
    throw new Error("invalid G2 point: expected 96/192 bytes");
  }
}
function signatureG2FromBytes(hex) {
  const { ORDER: P2 } = Fp$1;
  const { infinity, sort, value } = parseMask(ensureBytes("signatureHex", hex));
  const Point = bls12_381.G2.Point;
  const half = value.length / 2;
  if (half !== 48 && half !== 96)
    throw new Error("invalid compressed signature length, expected 96/192 bytes");
  const z1 = bytesToNumberBE(value.slice(0, half));
  const z2 = bytesToNumberBE(value.slice(half));
  if (infinity)
    return Point.ZERO;
  const x1 = Fp$1.create(z1 & bitMask(Fp$1.BITS));
  const x2 = Fp$1.create(z2);
  const x3 = Fp2.create({ c0: x2, c1: x1 });
  const y2 = Fp2.add(Fp2.pow(x3, _3n), bls12_381_CURVE_G2.b);
  let y3 = Fp2.sqrt(y2);
  if (!y3)
    throw new Error("Failed to find a square root");
  const { re: y0, im: y1 } = Fp2.reim(y3);
  const aflag1 = BigInt(sort);
  const isGreater = y1 > _0n$1 && y1 * _2n$2 / P2 !== aflag1;
  const is0 = y1 === _0n$1 && y0 * _2n$2 / P2 !== aflag1;
  if (isGreater || is0)
    y3 = Fp2.neg(y3);
  const point = Point.fromAffine({ x: x3, y: y3 });
  point.assertValidity();
  return point;
}
const bls12_381 = bls({
  // Fields
  fields: {
    Fp: Fp$1,
    Fp2,
    Fp6,
    Fp12,
    Fr: bls12_381_Fr
  },
  // G1: y² = x³ + 4
  G1: {
    ...bls12_381_CURVE_G1,
    Fp: Fp$1,
    htfDefaults: { ...htfDefaults, m: 1, DST: "BLS_SIG_BLS12381G1_XMD:SHA-256_SSWU_RO_NUL_" },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    isTorsionFree: (c2, point) => {
      const beta = BigInt("0x5f19672fdf76ce51ba69c6076a0f77eaddb3a93be6f89688de17d813620a00022e01fffffffefffe");
      const phi = new c2(Fp$1.mul(point.X, beta), point.Y, point.Z);
      const xP = point.multiplyUnsafe(BLS_X).negate();
      const u2P = xP.multiplyUnsafe(BLS_X);
      return u2P.equals(phi);
    },
    // Clear cofactor of G1
    // https://eprint.iacr.org/2019/403
    clearCofactor: (_c, point) => {
      return point.multiplyUnsafe(BLS_X).add(point);
    },
    mapToCurve: mapToG1,
    fromBytes: pointG1FromBytes,
    toBytes: pointG1ToBytes,
    ShortSignature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG1FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG1FromBytes(hex);
      },
      toBytes(point) {
        return signatureG1ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG1ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG1ToBytes(point));
      }
    }
  },
  G2: {
    ...bls12_381_CURVE_G2,
    Fp: Fp2,
    // https://datatracker.ietf.org/doc/html/rfc9380#name-clearing-the-cofactor
    // https://datatracker.ietf.org/doc/html/rfc9380#name-cofactor-clearing-for-bls12
    hEff: BigInt("0xbc69f08f2ee75b3584c6a0ea91b352888e2a8e9145ad7689986ff031508ffe1329c2f178731db956d82bf015d1212b02ec0ec69d7477c1ae954cbc06689f6a359894c0adebbf6b4e8020005aaa95551"),
    htfDefaults: { ...htfDefaults },
    wrapPrivateKey: true,
    allowInfinityPoint: true,
    mapToCurve: mapToG2,
    // Checks is the point resides in prime-order subgroup.
    // point.isTorsionFree() should return true for valid points
    // It returns false for shitty points.
    // https://eprint.iacr.org/2021/1130.pdf
    // Older version: https://eprint.iacr.org/2019/814.pdf
    isTorsionFree: (c2, P2) => {
      return P2.multiplyUnsafe(BLS_X).negate().equals(G2psi(c2, P2));
    },
    // Maps the point into the prime-order subgroup G2.
    // clear_cofactor_bls12381_g2 from RFC 9380.
    // https://eprint.iacr.org/2017/419.pdf
    // prettier-ignore
    clearCofactor: (c2, P2) => {
      const x2 = BLS_X;
      let t1 = P2.multiplyUnsafe(x2).negate();
      let t2 = G2psi(c2, P2);
      let t3 = P2.double();
      t3 = G2psi2(c2, t3);
      t3 = t3.subtract(t2);
      t2 = t1.add(t2);
      t2 = t2.multiplyUnsafe(x2).negate();
      t3 = t3.add(t2);
      t3 = t3.subtract(t1);
      const Q2 = t3.subtract(P2);
      return Q2;
    },
    fromBytes: pointG2FromBytes,
    toBytes: pointG2ToBytes,
    Signature: {
      fromBytes(bytes) {
        abytes(bytes);
        return signatureG2FromBytes(bytes);
      },
      fromHex(hex) {
        return signatureG2FromBytes(hex);
      },
      toBytes(point) {
        return signatureG2ToBytes(point);
      },
      toRawBytes(point) {
        return signatureG2ToBytes(point);
      },
      toHex(point) {
        return bytesToHex(signatureG2ToBytes(point));
      }
    }
  },
  params: {
    ateLoopSize: BLS_X,
    // The BLS parameter x for BLS12-381
    r: bls12_381_CURVE_G1.n,
    // order; z⁴ − z² + 1; CURVE.n from other curves
    xNegative: true,
    twistType: "multiplicative"
  },
  htfDefaults
});
const isogenyMapG2 = isogenyMap(Fp2, [
  // xNum
  [
    [
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6",
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97d6"
    ],
    [
      "0x0",
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71a"
    ],
    [
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71e",
      "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38d"
    ],
    [
      "0x171d6541fa38ccfaed6dea691f5fb614cb14b4e7f4e810aa22d6108f142b85757098e38d0f671c7188e2aaaaaaaa5ed1",
      "0x0"
    ]
  ],
  // xDen
  [
    [
      "0x0",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa63"
    ],
    [
      "0xc",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa9f"
    ],
    ["0x1", "0x0"]
    // LAST 1
  ],
  // yNum
  [
    [
      "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706",
      "0x1530477c7ab4113b59a4c18b076d11930f7da5d4a07f649bf54439d87d27e500fc8c25ebf8c92f6812cfc71c71c6d706"
    ],
    [
      "0x0",
      "0x5c759507e8e333ebb5b7a9a47d7ed8532c52d39fd3a042a88b58423c50ae15d5c2638e343d9c71c6238aaaaaaaa97be"
    ],
    [
      "0x11560bf17baa99bc32126fced787c88f984f87adf7ae0c7f9a208c6b4f20a4181472aaa9cb8d555526a9ffffffffc71c",
      "0x8ab05f8bdd54cde190937e76bc3e447cc27c3d6fbd7063fcd104635a790520c0a395554e5c6aaaa9354ffffffffe38f"
    ],
    [
      "0x124c9ad43b6cf79bfbf7043de3811ad0761b0f37a1e26286b0e977c69aa274524e79097a56dc4bd9e1b371c71c718b10",
      "0x0"
    ]
  ],
  // yDen
  [
    [
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa8fb"
    ],
    [
      "0x0",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffa9d3"
    ],
    [
      "0x12",
      "0x1a0111ea397fe69a4b1ba7b6434bacd764774b84f38512bf6730d2a0f6b0f6241eabfffeb153ffffb9feffffffffaa99"
    ],
    ["0x1", "0x0"]
    // LAST 1
  ]
].map((i) => i.map((pair) => Fp2.fromBigTuple(pair.map(BigInt)))));
const isogenyMapG1 = isogenyMap(Fp$1, [
  // xNum
  [
    "0x11a05f2b1e833340b809101dd99815856b303e88a2d7005ff2627b56cdb4e2c85610c2d5f2e62d6eaeac1662734649b7",
    "0x17294ed3e943ab2f0588bab22147a81c7c17e75b2f6a8417f565e33c70d1e86b4838f2a6f318c356e834eef1b3cb83bb",
    "0xd54005db97678ec1d1048c5d10a9a1bce032473295983e56878e501ec68e25c958c3e3d2a09729fe0179f9dac9edcb0",
    "0x1778e7166fcc6db74e0609d307e55412d7f5e4656a8dbf25f1b33289f1b330835336e25ce3107193c5b388641d9b6861",
    "0xe99726a3199f4436642b4b3e4118e5499db995a1257fb3f086eeb65982fac18985a286f301e77c451154ce9ac8895d9",
    "0x1630c3250d7313ff01d1201bf7a74ab5db3cb17dd952799b9ed3ab9097e68f90a0870d2dcae73d19cd13c1c66f652983",
    "0xd6ed6553fe44d296a3726c38ae652bfb11586264f0f8ce19008e218f9c86b2a8da25128c1052ecaddd7f225a139ed84",
    "0x17b81e7701abdbe2e8743884d1117e53356de5ab275b4db1a682c62ef0f2753339b7c8f8c8f475af9ccb5618e3f0c88e",
    "0x80d3cf1f9a78fc47b90b33563be990dc43b756ce79f5574a2c596c928c5d1de4fa295f296b74e956d71986a8497e317",
    "0x169b1f8e1bcfa7c42e0c37515d138f22dd2ecb803a0c5c99676314baf4bb1b7fa3190b2edc0327797f241067be390c9e",
    "0x10321da079ce07e272d8ec09d2565b0dfa7dccdde6787f96d50af36003b14866f69b771f8c285decca67df3f1605fb7b",
    "0x6e08c248e260e70bd1e962381edee3d31d79d7e22c837bc23c0bf1bc24c6b68c24b1b80b64d391fa9c8ba2e8ba2d229"
  ],
  // xDen
  [
    "0x8ca8d548cff19ae18b2e62f4bd3fa6f01d5ef4ba35b48ba9c9588617fc8ac62b558d681be343df8993cf9fa40d21b1c",
    "0x12561a5deb559c4348b4711298e536367041e8ca0cf0800c0126c2588c48bf5713daa8846cb026e9e5c8276ec82b3bff",
    "0xb2962fe57a3225e8137e629bff2991f6f89416f5a718cd1fca64e00b11aceacd6a3d0967c94fedcfcc239ba5cb83e19",
    "0x3425581a58ae2fec83aafef7c40eb545b08243f16b1655154cca8abc28d6fd04976d5243eecf5c4130de8938dc62cd8",
    "0x13a8e162022914a80a6f1d5f43e7a07dffdfc759a12062bb8d6b44e833b306da9bd29ba81f35781d539d395b3532a21e",
    "0xe7355f8e4e667b955390f7f0506c6e9395735e9ce9cad4d0a43bcef24b8982f7400d24bc4228f11c02df9a29f6304a5",
    "0x772caacf16936190f3e0c63e0596721570f5799af53a1894e2e073062aede9cea73b3538f0de06cec2574496ee84a3a",
    "0x14a7ac2a9d64a8b230b3f5b074cf01996e7f63c21bca68a81996e1cdf9822c580fa5b9489d11e2d311f7d99bbdcc5a5e",
    "0xa10ecf6ada54f825e920b3dafc7a3cce07f8d1d7161366b74100da67f39883503826692abba43704776ec3a79a1d641",
    "0x95fc13ab9e92ad4476d6e3eb3a56680f682b4ee96f7d03776df533978f31c1593174e4b4b7865002d6384d168ecdd0a",
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ],
  // yNum
  [
    "0x90d97c81ba24ee0259d1f094980dcfa11ad138e48a869522b52af6c956543d3cd0c7aee9b3ba3c2be9845719707bb33",
    "0x134996a104ee5811d51036d776fb46831223e96c254f383d0f906343eb67ad34d6c56711962fa8bfe097e75a2e41c696",
    "0xcc786baa966e66f4a384c86a3b49942552e2d658a31ce2c344be4b91400da7d26d521628b00523b8dfe240c72de1f6",
    "0x1f86376e8981c217898751ad8746757d42aa7b90eeb791c09e4a3ec03251cf9de405aba9ec61deca6355c77b0e5f4cb",
    "0x8cc03fdefe0ff135caf4fe2a21529c4195536fbe3ce50b879833fd221351adc2ee7f8dc099040a841b6daecf2e8fedb",
    "0x16603fca40634b6a2211e11db8f0a6a074a7d0d4afadb7bd76505c3d3ad5544e203f6326c95a807299b23ab13633a5f0",
    "0x4ab0b9bcfac1bbcb2c977d027796b3ce75bb8ca2be184cb5231413c4d634f3747a87ac2460f415ec961f8855fe9d6f2",
    "0x987c8d5333ab86fde9926bd2ca6c674170a05bfe3bdd81ffd038da6c26c842642f64550fedfe935a15e4ca31870fb29",
    "0x9fc4018bd96684be88c9e221e4da1bb8f3abd16679dc26c1e8b6e6a1f20cabe69d65201c78607a360370e577bdba587",
    "0xe1bba7a1186bdb5223abde7ada14a23c42a0ca7915af6fe06985e7ed1e4d43b9b3f7055dd4eba6f2bafaaebca731c30",
    "0x19713e47937cd1be0dfd0b8f1d43fb93cd2fcbcb6caf493fd1183e416389e61031bf3a5cce3fbafce813711ad011c132",
    "0x18b46a908f36f6deb918c143fed2edcc523559b8aaf0c2462e6bfe7f911f643249d9cdf41b44d606ce07c8a4d0074d8e",
    "0xb182cac101b9399d155096004f53f447aa7b12a3426b08ec02710e807b4633f06c851c1919211f20d4c04f00b971ef8",
    "0x245a394ad1eca9b72fc00ae7be315dc757b3b080d4c158013e6632d3c40659cc6cf90ad1c232a6442d9d3f5db980133",
    "0x5c129645e44cf1102a159f748c4a3fc5e673d81d7e86568d9ab0f5d396a7ce46ba1049b6579afb7866b1e715475224b",
    "0x15e6be4e990f03ce4ea50b3b42df2eb5cb181d8f84965a3957add4fa95af01b2b665027efec01c7704b456be69c8b604"
  ],
  // yDen
  [
    "0x16112c4c3a9c98b252181140fad0eae9601a6de578980be6eec3232b5be72e7a07f3688ef60c206d01479253b03663c1",
    "0x1962d75c2381201e1a0cbd6c43c348b885c84ff731c4d59ca4a10356f453e01f78a4260763529e3532f6102c2e49a03d",
    "0x58df3306640da276faaae7d6e8eb15778c4855551ae7f310c35a5dd279cd2eca6757cd636f96f891e2538b53dbf67f2",
    "0x16b7d288798e5395f20d23bf89edb4d1d115c5dbddbcd30e123da489e726af41727364f2c28297ada8d26d98445f5416",
    "0xbe0e079545f43e4b00cc912f8228ddcc6d19c9f0f69bbb0542eda0fc9dec916a20b15dc0fd2ededda39142311a5001d",
    "0x8d9e5297186db2d9fb266eaac783182b70152c65550d881c5ecd87b6f0f5a6449f38db9dfa9cce202c6477faaf9b7ac",
    "0x166007c08a99db2fc3ba8734ace9824b5eecfdfa8d0cf8ef5dd365bc400a0051d5fa9c01a58b1fb93d1a1399126a775c",
    "0x16a3ef08be3ea7ea03bcddfabba6ff6ee5a4375efa1f4fd7feb34fd206357132b920f5b00801dee460ee415a15812ed9",
    "0x1866c8ed336c61231a1be54fd1d74cc4f9fb0ce4c6af5920abc5750c4bf39b4852cfe2f7bb9248836b233d9d55535d4a",
    "0x167a55cda70a6e1cea820597d94a84903216f763e13d87bb5308592e7ea7d4fbc7385ea3d529b35e346ef48bb8913f55",
    "0x4d2f259eea405bd48f010a01ad2911d9c6dd039bb61a6290e591b36e636a5c871a5c29f4f83060400f8b49cba8f6aa8",
    "0xaccbb67481d033ff5852c1e48c50c477f94ff8aefce42d28c0f9a88cea7913516f968986f7ebbea9684b529e2561092",
    "0xad6b9514c767fe3c3613144b45f1496543346d98adf02267d5ceef9a00d9b8693000763e3b90ac11e99b138573345cc",
    "0x2660400eb2e4f3b628bdd0d53cd76f2bf565b94e72927c1cb748df27942480e420517bd8714cc80d1fadc1326ed06f7",
    "0xe0fa1d816ddc03e6b24255e0d7819c171c40f65e273b853324efcd6356caa205ca2f570f13497804415473a1d634b8f",
    "0x000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001"
    // LAST 1
  ]
].map((i) => i.map((j2) => BigInt(j2))));
const G1_SWU = mapToCurveSimpleSWU(Fp$1, {
  A: Fp$1.create(BigInt("0x144698a3b8e9433d693a02c96d4982b0ea985383ee66a8d8e8981aefd881ac98936f8da0e0f97f5cf428082d584c1d")),
  B: Fp$1.create(BigInt("0x12e2908d11688030018b12e8753eee3b2016c1f0f24f4070a0b9c14fcef35ef55a23215a316ceaa5d1cc48e98e172be0")),
  Z: Fp$1.create(BigInt(11))
});
const G2_SWU = mapToCurveSimpleSWU(Fp2, {
  A: Fp2.create({ c0: Fp$1.create(_0n$1), c1: Fp$1.create(BigInt(240)) }),
  // A' = 240 * I
  B: Fp2.create({ c0: Fp$1.create(BigInt(1012)), c1: Fp$1.create(BigInt(1012)) }),
  // B' = 1012 * (1 + I)
  Z: Fp2.create({ c0: Fp$1.create(BigInt(-2)), c1: Fp$1.create(BigInt(-1)) })
  // Z: -(2 + I)
});
function mapToG1(scalars) {
  const { x: x2, y: y2 } = G1_SWU(Fp$1.create(scalars[0]));
  return isogenyMapG1(x2, y2);
}
function mapToG2(scalars) {
  const { x: x2, y: y2 } = G2_SWU(Fp2.fromBigTuple(scalars));
  return isogenyMapG2(x2, y2);
}
function blsVerify(pk, sig, msg) {
  const primaryKey = typeof pk === "string" ? pk : bytesToHex(pk);
  const signature = typeof sig === "string" ? sig : bytesToHex(sig);
  const message = typeof msg === "string" ? msg : bytesToHex(msg);
  return bls12_381.verifyShortSignature(signature, message, primaryKey);
}
const MILLISECOND_TO_NANOSECONDS = BigInt(1e6);
const decodeLeb128 = (buf) => {
  return lebDecode(new PipeArrayBuffer(buf));
};
const decodeTime = (buf) => {
  const timestampNs = decodeLeb128(buf);
  const timestampMs = timestampNs / MILLISECOND_TO_NANOSECONDS;
  return new Date(Number(timestampMs));
};
const MINUTES_TO_MSEC = 60 * 1e3;
const HOURS_TO_MINUTES = 60;
const DAYS_TO_HOURS = 24;
const DAYS_TO_MINUTES = DAYS_TO_HOURS * HOURS_TO_MINUTES;
const DEFAULT_CERTIFICATE_MAX_AGE_IN_MINUTES = 5;
const DEFAULT_CERTIFICATE_MAX_MINUTES_IN_FUTURE = 5;
const DEFAULT_CERTIFICATE_DELEGATION_MAX_AGE_IN_MINUTES = 30 * DAYS_TO_MINUTES;
var NodeType;
(function(NodeType2) {
  NodeType2[NodeType2["Empty"] = 0] = "Empty";
  NodeType2[NodeType2["Fork"] = 1] = "Fork";
  NodeType2[NodeType2["Labeled"] = 2] = "Labeled";
  NodeType2[NodeType2["Leaf"] = 3] = "Leaf";
  NodeType2[NodeType2["Pruned"] = 4] = "Pruned";
})(NodeType || (NodeType = {}));
function isBufferGreaterThan(a2, b2) {
  for (let i = 0; i < a2.length; i++) {
    if (a2[i] > b2[i]) {
      return true;
    }
  }
  return false;
}
const _Certificate = class _Certificate {
  constructor(certificate, _rootKey, _canisterId, _blsVerify, _maxAgeInMinutes = DEFAULT_CERTIFICATE_MAX_AGE_IN_MINUTES, disableTimeVerification = false, agent) {
    __privateAdd(this, _disableTimeVerification, false);
    __privateAdd(this, _agent);
    this._rootKey = _rootKey;
    this._canisterId = _canisterId;
    this._blsVerify = _blsVerify;
    this._maxAgeInMinutes = _maxAgeInMinutes;
    __privateSet(this, _disableTimeVerification, disableTimeVerification);
    this.cert = decode(certificate);
    if (agent && "getTimeDiffMsecs" in agent && "hasSyncedTime" in agent && "syncTime" in agent) {
      __privateSet(this, _agent, agent);
    }
  }
  /**
   * Create a new instance of a certificate, automatically verifying it.
   * @param {CreateCertificateOptions} options {@link CreateCertificateOptions}
   * @throws if the verification of the certificate fails
   */
  static async create(options) {
    const cert = _Certificate.createUnverified(options);
    await cert.verify();
    return cert;
  }
  static createUnverified(options) {
    return new _Certificate(options.certificate, options.rootKey, options.canisterId, options.blsVerify ?? blsVerify, options.maxAgeInMinutes, options.disableTimeVerification, options.agent);
  }
  /**
   * Lookup a path in the certificate tree, using {@link lookup_path}.
   * @param path The path to lookup.
   * @returns The result of the lookup.
   */
  lookup_path(path) {
    return lookup_path(path, this.cert.tree);
  }
  /**
   * Lookup a subtree in the certificate tree, using {@link lookup_subtree}.
   * @param path The path to lookup.
   * @returns The result of the lookup.
   */
  lookup_subtree(path) {
    return lookup_subtree(path, this.cert.tree);
  }
  async verify() {
    var _a2, _b2;
    const rootHash = await reconstruct(this.cert.tree);
    const derKey = await this._checkDelegationAndGetKey(this.cert.delegation);
    const sig = this.cert.signature;
    const key = extractDER(derKey);
    const msg = concatBytes(domain_sep("ic-state-root"), rootHash);
    const lookupTime = lookupResultToBuffer(this.lookup_path(["time"]));
    if (!lookupTime) {
      throw ProtocolError.fromCode(new CertificateVerificationErrorCode("Certificate does not contain a time"));
    }
    if (!__privateGet(this, _disableTimeVerification)) {
      const timeDiffMsecs = ((_a2 = __privateGet(this, _agent)) == null ? void 0 : _a2.getTimeDiffMsecs()) ?? 0;
      const maxAgeInMsec = this._maxAgeInMinutes * MINUTES_TO_MSEC;
      const now = /* @__PURE__ */ new Date();
      const adjustedNow = now.getTime() + timeDiffMsecs;
      const earliestCertificateTime = adjustedNow - maxAgeInMsec;
      const latestCertificateTime = adjustedNow + DEFAULT_CERTIFICATE_MAX_MINUTES_IN_FUTURE * MINUTES_TO_MSEC;
      const certTime = decodeTime(lookupTime);
      const isCertificateTimePast = certTime.getTime() < earliestCertificateTime;
      const isCertificateTimeFuture = certTime.getTime() > latestCertificateTime;
      if ((isCertificateTimePast || isCertificateTimeFuture) && __privateGet(this, _agent) && !__privateGet(this, _agent).hasSyncedTime()) {
        await __privateGet(this, _agent).syncTime(this._canisterId);
        return await this.verify();
      }
      if (isCertificateTimePast) {
        throw TrustError.fromCode(new CertificateTimeErrorCode(this._maxAgeInMinutes, certTime, now, timeDiffMsecs, "past"));
      } else if (isCertificateTimeFuture) {
        if ((_b2 = __privateGet(this, _agent)) == null ? void 0 : _b2.hasSyncedTime()) {
          throw UnknownError.fromCode(new UnexpectedErrorCode("System time has been synced with the IC network, but certificate is still too far in the future."));
        }
        throw TrustError.fromCode(new CertificateTimeErrorCode(5, certTime, now, timeDiffMsecs, "future"));
      }
    }
    try {
      const sigVer = await this._blsVerify(key, sig, msg);
      if (!sigVer) {
        throw TrustError.fromCode(new CertificateVerificationErrorCode("Invalid signature"));
      }
    } catch (err) {
      throw TrustError.fromCode(new CertificateVerificationErrorCode("Signature verification failed", err));
    }
  }
  async _checkDelegationAndGetKey(d2) {
    if (!d2) {
      return this._rootKey;
    }
    const cert = _Certificate.createUnverified({
      certificate: d2.certificate,
      rootKey: this._rootKey,
      canisterId: this._canisterId,
      blsVerify: this._blsVerify,
      disableTimeVerification: __privateGet(this, _disableTimeVerification),
      maxAgeInMinutes: DEFAULT_CERTIFICATE_DELEGATION_MAX_AGE_IN_MINUTES,
      agent: __privateGet(this, _agent)
    });
    if (cert.cert.delegation) {
      throw ProtocolError.fromCode(new CertificateHasTooManyDelegationsErrorCode());
    }
    await cert.verify();
    const subnetIdBytes = d2.subnet_id;
    const subnetId = Principal$2.fromUint8Array(subnetIdBytes);
    const canisterInRange = check_canister_ranges({
      canisterId: this._canisterId,
      subnetId,
      tree: cert.cert.tree
    });
    if (!canisterInRange) {
      throw TrustError.fromCode(new CertificateNotAuthorizedErrorCode(this._canisterId, subnetId));
    }
    const publicKeyLookup = lookupResultToBuffer(cert.lookup_path(["subnet", subnetIdBytes, "public_key"]));
    if (!publicKeyLookup) {
      throw TrustError.fromCode(new MissingLookupValueErrorCode(`Could not find subnet key for subnet ID ${subnetId.toText()}`));
    }
    return publicKeyLookup;
  }
};
_disableTimeVerification = new WeakMap();
_agent = new WeakMap();
let Certificate = _Certificate;
const DER_PREFIX = hexToBytes("308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100");
const KEY_LENGTH = 96;
function extractDER(buf) {
  const expectedLength = DER_PREFIX.byteLength + KEY_LENGTH;
  if (buf.byteLength !== expectedLength) {
    throw ProtocolError.fromCode(new DerKeyLengthMismatchErrorCode(expectedLength, buf.byteLength));
  }
  const prefix = buf.slice(0, DER_PREFIX.byteLength);
  if (!uint8Equals(prefix, DER_PREFIX)) {
    throw ProtocolError.fromCode(new DerPrefixMismatchErrorCode(DER_PREFIX, prefix));
  }
  return buf.slice(DER_PREFIX.byteLength);
}
function lookupResultToBuffer(result) {
  if (result.status !== LookupPathStatus.Found) {
    return void 0;
  }
  if (result.value instanceof Uint8Array) {
    return result.value;
  }
  return void 0;
}
async function reconstruct(t) {
  switch (t[0]) {
    case NodeType.Empty:
      return sha256(domain_sep("ic-hashtree-empty"));
    case NodeType.Pruned:
      return t[1];
    case NodeType.Leaf:
      return sha256(concatBytes(domain_sep("ic-hashtree-leaf"), t[1]));
    case NodeType.Labeled:
      return sha256(concatBytes(domain_sep("ic-hashtree-labeled"), t[1], await reconstruct(t[2])));
    case NodeType.Fork:
      return sha256(concatBytes(domain_sep("ic-hashtree-fork"), await reconstruct(t[1]), await reconstruct(t[2])));
    default:
      throw UNREACHABLE_ERROR;
  }
}
function domain_sep(s2) {
  const len = new Uint8Array([s2.length]);
  const str = new TextEncoder().encode(s2);
  return concatBytes(len, str);
}
function pathToLabel(path) {
  return typeof path[0] === "string" ? utf8ToBytes(path[0]) : path[0];
}
var LookupPathStatus;
(function(LookupPathStatus2) {
  LookupPathStatus2["Unknown"] = "Unknown";
  LookupPathStatus2["Absent"] = "Absent";
  LookupPathStatus2["Found"] = "Found";
  LookupPathStatus2["Error"] = "Error";
})(LookupPathStatus || (LookupPathStatus = {}));
var LookupSubtreeStatus;
(function(LookupSubtreeStatus2) {
  LookupSubtreeStatus2["Absent"] = "Absent";
  LookupSubtreeStatus2["Unknown"] = "Unknown";
  LookupSubtreeStatus2["Found"] = "Found";
})(LookupSubtreeStatus || (LookupSubtreeStatus = {}));
var LookupLabelStatus;
(function(LookupLabelStatus2) {
  LookupLabelStatus2["Absent"] = "Absent";
  LookupLabelStatus2["Unknown"] = "Unknown";
  LookupLabelStatus2["Found"] = "Found";
  LookupLabelStatus2["Less"] = "Less";
  LookupLabelStatus2["Greater"] = "Greater";
})(LookupLabelStatus || (LookupLabelStatus = {}));
function lookup_path(path, tree) {
  if (path.length === 0) {
    switch (tree[0]) {
      case NodeType.Empty: {
        return {
          status: LookupPathStatus.Absent
        };
      }
      case NodeType.Leaf: {
        if (!tree[1]) {
          throw UnknownError.fromCode(new HashTreeDecodeErrorCode("Invalid tree structure for leaf"));
        }
        if (tree[1] instanceof Uint8Array) {
          return {
            status: LookupPathStatus.Found,
            value: tree[1].slice(tree[1].byteOffset, tree[1].byteLength + tree[1].byteOffset)
          };
        }
        throw UNREACHABLE_ERROR;
      }
      case NodeType.Pruned: {
        return {
          status: LookupPathStatus.Unknown
        };
      }
      case NodeType.Labeled:
      case NodeType.Fork: {
        return {
          status: LookupPathStatus.Error
        };
      }
      default: {
        throw UNREACHABLE_ERROR;
      }
    }
  }
  const label = pathToLabel(path);
  const lookupResult = find_label(label, tree);
  switch (lookupResult.status) {
    case LookupLabelStatus.Found: {
      return lookup_path(path.slice(1), lookupResult.value);
    }
    case LookupLabelStatus.Absent:
    case LookupLabelStatus.Greater:
    case LookupLabelStatus.Less: {
      return {
        status: LookupPathStatus.Absent
      };
    }
    case LookupLabelStatus.Unknown: {
      return {
        status: LookupPathStatus.Unknown
      };
    }
    default: {
      throw UNREACHABLE_ERROR;
    }
  }
}
function lookup_subtree(path, tree) {
  if (path.length === 0) {
    return {
      status: LookupSubtreeStatus.Found,
      value: tree
    };
  }
  const label = pathToLabel(path);
  const lookupResult = find_label(label, tree);
  switch (lookupResult.status) {
    case LookupLabelStatus.Found: {
      return lookup_subtree(path.slice(1), lookupResult.value);
    }
    case LookupLabelStatus.Unknown: {
      return {
        status: LookupSubtreeStatus.Unknown
      };
    }
    case LookupLabelStatus.Absent:
    case LookupLabelStatus.Greater:
    case LookupLabelStatus.Less: {
      return {
        status: LookupSubtreeStatus.Absent
      };
    }
    default: {
      throw UNREACHABLE_ERROR;
    }
  }
}
function flatten_forks(t) {
  switch (t[0]) {
    case NodeType.Empty:
      return [];
    case NodeType.Fork:
      return flatten_forks(t[1]).concat(flatten_forks(t[2]));
    default:
      return [t];
  }
}
function find_label(label, tree) {
  switch (tree[0]) {
    case NodeType.Labeled:
      if (isBufferGreaterThan(label, tree[1])) {
        return {
          status: LookupLabelStatus.Greater
        };
      }
      if (uint8Equals(label, tree[1])) {
        return {
          status: LookupLabelStatus.Found,
          value: tree[2]
        };
      }
      return {
        status: LookupLabelStatus.Less
      };
    case NodeType.Fork: {
      const leftLookupResult = find_label(label, tree[1]);
      switch (leftLookupResult.status) {
        case LookupLabelStatus.Greater: {
          const rightLookupResult = find_label(label, tree[2]);
          if (rightLookupResult.status === LookupLabelStatus.Less) {
            return {
              status: LookupLabelStatus.Absent
            };
          }
          return rightLookupResult;
        }
        case LookupLabelStatus.Unknown: {
          const rightLookupResult = find_label(label, tree[2]);
          if (rightLookupResult.status === LookupLabelStatus.Less) {
            return {
              status: LookupLabelStatus.Unknown
            };
          }
          return rightLookupResult;
        }
        default: {
          return leftLookupResult;
        }
      }
    }
    case NodeType.Pruned:
      return {
        status: LookupLabelStatus.Unknown
      };
    default:
      return {
        status: LookupLabelStatus.Absent
      };
  }
}
function check_canister_ranges(params) {
  const { canisterId, subnetId, tree } = params;
  const rangeLookup = lookup_path(["subnet", subnetId.toUint8Array(), "canister_ranges"], tree);
  if (rangeLookup.status !== LookupPathStatus.Found) {
    throw ProtocolError.fromCode(new LookupErrorCode(`Could not find canister ranges for subnet ${subnetId.toText()}`, rangeLookup.status));
  }
  if (!(rangeLookup.value instanceof Uint8Array)) {
    throw ProtocolError.fromCode(new MalformedLookupFoundValueErrorCode(`Could not find canister ranges for subnet ${subnetId.toText()}`));
  }
  const ranges_arr = decode(rangeLookup.value);
  const ranges = ranges_arr.map((v2) => [
    Principal$2.fromUint8Array(v2[0]),
    Principal$2.fromUint8Array(v2[1])
  ]);
  const canisterInRange = ranges.some((r2) => r2[0].ltEq(canisterId) && r2[1].gtEq(canisterId));
  return canisterInRange;
}
const request = async (options) => {
  const { agent, paths, disableCertificateTimeVerification = false } = options;
  const canisterId = Principal$2.from(options.canisterId);
  const uniquePaths = [...new Set(paths)];
  const status = /* @__PURE__ */ new Map();
  const promises = uniquePaths.map((path, index) => {
    const encodedPath = encodePath(path, canisterId);
    return (async () => {
      try {
        if (agent.rootKey === null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const rootKey = agent.rootKey;
        const response = await agent.readState(canisterId, {
          paths: [encodedPath]
        });
        const certificate = await Certificate.create({
          certificate: response.certificate,
          rootKey,
          canisterId,
          disableTimeVerification: disableCertificateTimeVerification,
          agent
        });
        const lookup = (cert, path3) => {
          if (path3 === "subnet") {
            const data2 = fetchNodeKeys(response.certificate, canisterId, rootKey);
            return {
              path: path3,
              data: data2
            };
          } else {
            return {
              path: path3,
              data: lookupResultToBuffer(cert.lookup_path(encodedPath))
            };
          }
        };
        const { path: path2, data } = lookup(certificate, uniquePaths[index]);
        if (!data) {
          console.warn(`Expected to find result for path ${path2}, but instead found nothing.`);
          if (typeof path2 === "string") {
            status.set(path2, null);
          } else {
            status.set(path2.key, null);
          }
        } else {
          switch (path2) {
            case "time": {
              status.set(path2, decodeTime(data));
              break;
            }
            case "controllers": {
              status.set(path2, decodeControllers(data));
              break;
            }
            case "module_hash": {
              status.set(path2, bytesToHex(data));
              break;
            }
            case "subnet": {
              status.set(path2, data);
              break;
            }
            case "candid": {
              status.set(path2, new TextDecoder().decode(data));
              break;
            }
            default: {
              if (typeof path2 !== "string" && "key" in path2 && "path" in path2) {
                switch (path2.decodeStrategy) {
                  case "raw":
                    status.set(path2.key, data);
                    break;
                  case "leb128": {
                    status.set(path2.key, decodeLeb128(data));
                    break;
                  }
                  case "cbor": {
                    status.set(path2.key, decode(data));
                    break;
                  }
                  case "hex": {
                    status.set(path2.key, bytesToHex(data));
                    break;
                  }
                  case "utf-8": {
                    status.set(path2.key, new TextDecoder().decode(data));
                  }
                }
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof AgentError && (error.hasCode(CertificateVerificationErrorCode) || error.hasCode(CertificateTimeErrorCode))) {
          throw error;
        }
        if (typeof path !== "string" && "key" in path && "path" in path) {
          status.set(path.key, null);
        } else {
          status.set(path, null);
        }
        console.group();
        console.warn(`Expected to find result for path ${path}, but instead found nothing.`);
        console.warn(error);
        console.groupEnd();
      }
    })();
  });
  await Promise.all(promises);
  return status;
};
const fetchNodeKeys = (certificate, canisterId, root_key) => {
  if (!canisterId._isPrincipal) {
    throw InputError.fromCode(new UnexpectedErrorCode("Invalid canisterId"));
  }
  const cert = decode(certificate);
  const tree = cert.tree;
  let delegation = cert.delegation;
  let subnetId;
  if (delegation && delegation.subnet_id) {
    subnetId = Principal$2.fromUint8Array(new Uint8Array(delegation.subnet_id));
  } else if (!delegation && typeof root_key !== "undefined") {
    subnetId = Principal$2.selfAuthenticating(new Uint8Array(root_key));
    delegation = {
      subnet_id: subnetId.toUint8Array(),
      certificate: new Uint8Array(0)
    };
  } else {
    subnetId = Principal$2.selfAuthenticating(Principal$2.fromText("tdb26-jop6k-aogll-7ltgs-eruif-6kk7m-qpktf-gdiqx-mxtrf-vb5e6-eqe").toUint8Array());
    delegation = {
      subnet_id: subnetId.toUint8Array(),
      certificate: new Uint8Array(0)
    };
  }
  const canisterInRange = check_canister_ranges({ canisterId, subnetId, tree });
  if (!canisterInRange) {
    throw TrustError.fromCode(new CertificateNotAuthorizedErrorCode(canisterId, subnetId));
  }
  const subnetLookupResult = lookup_subtree(["subnet", delegation.subnet_id, "node"], tree);
  if (subnetLookupResult.status !== LookupSubtreeStatus.Found) {
    throw ProtocolError.fromCode(new LookupErrorCode("Node not found", subnetLookupResult.status));
  }
  if (subnetLookupResult.value instanceof Uint8Array) {
    throw UnknownError.fromCode(new HashTreeDecodeErrorCode("Invalid node tree"));
  }
  const nodeForks = flatten_forks(subnetLookupResult.value);
  const nodeKeys = /* @__PURE__ */ new Map();
  nodeForks.forEach((fork) => {
    const node_id = Principal$2.from(fork[1]).toText();
    const publicKeyLookupResult = lookup_path(["public_key"], fork[2]);
    if (publicKeyLookupResult.status !== LookupPathStatus.Found) {
      throw ProtocolError.fromCode(new LookupErrorCode("Public key not found", publicKeyLookupResult.status));
    }
    const derEncodedPublicKey = publicKeyLookupResult.value;
    if (derEncodedPublicKey.byteLength !== 44) {
      throw ProtocolError.fromCode(new DerKeyLengthMismatchErrorCode(44, derEncodedPublicKey.byteLength));
    } else {
      nodeKeys.set(node_id, derEncodedPublicKey);
    }
  });
  return {
    subnetId: Principal$2.fromUint8Array(new Uint8Array(delegation.subnet_id)).toText(),
    nodeKeys
  };
};
const encodePath = (path, canisterId) => {
  const canisterUint8Array = canisterId.toUint8Array();
  switch (path) {
    case "time":
      return [utf8ToBytes("time")];
    case "controllers":
      return [utf8ToBytes("canister"), canisterUint8Array, utf8ToBytes("controllers")];
    case "module_hash":
      return [utf8ToBytes("canister"), canisterUint8Array, utf8ToBytes("module_hash")];
    case "subnet":
      return [utf8ToBytes("subnet")];
    case "candid":
      return [
        utf8ToBytes("canister"),
        canisterUint8Array,
        utf8ToBytes("metadata"),
        utf8ToBytes("candid:service")
      ];
    default: {
      if ("key" in path && "path" in path) {
        if (typeof path["path"] === "string" || path["path"] instanceof Uint8Array) {
          const metaPath = path.path;
          const encoded = typeof metaPath === "string" ? utf8ToBytes(metaPath) : metaPath;
          return [utf8ToBytes("canister"), canisterUint8Array, utf8ToBytes("metadata"), encoded];
        } else {
          return path["path"];
        }
      }
    }
  }
  throw UnknownError.fromCode(new UnexpectedErrorCode(`Error while encoding your path for canister status. Please ensure that your path ${path} was formatted correctly.`));
};
const decodeControllers = (buf) => {
  const controllersRaw = decode(buf);
  return controllersRaw.map((buf2) => {
    return Principal$2.fromUint8Array(buf2);
  });
};
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _0n = BigInt(0), _1n$1 = BigInt(1), _2n$1 = BigInt(2), _8n$1 = BigInt(8);
function isEdValidXY(Fp3, CURVE, x2, y2) {
  const x22 = Fp3.sqr(x2);
  const y22 = Fp3.sqr(y2);
  const left = Fp3.add(Fp3.mul(CURVE.a, x22), y22);
  const right = Fp3.add(Fp3.ONE, Fp3.mul(CURVE.d, Fp3.mul(x22, y22)));
  return Fp3.eql(left, right);
}
function edwards(params, extraOpts = {}) {
  const validated = _createCurveFields("edwards", params, extraOpts, extraOpts.FpFnLE);
  const { Fp: Fp3, Fn } = validated;
  let CURVE = validated.CURVE;
  const { h: cofactor } = CURVE;
  _validateObject(extraOpts, {}, { uvRatio: "function" });
  const MASK = _2n$1 << BigInt(Fn.BYTES * 8) - _1n$1;
  const modP = (n) => Fp3.create(n);
  const uvRatio2 = extraOpts.uvRatio || ((u, v2) => {
    try {
      return { isValid: true, value: Fp3.sqrt(Fp3.div(u, v2)) };
    } catch (e) {
      return { isValid: false, value: _0n };
    }
  });
  if (!isEdValidXY(Fp3, CURVE, CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  function acoord(title, n, banZero = false) {
    const min = banZero ? _1n$1 : _0n;
    aInRange("coordinate " + title, n, min, MASK);
    return n;
  }
  function aextpoint(other) {
    if (!(other instanceof Point))
      throw new Error("ExtendedPoint expected");
  }
  const toAffineMemo = memoized((p2, iz) => {
    const { X: X2, Y: Y2, Z: Z2 } = p2;
    const is0 = p2.is0();
    if (iz == null)
      iz = is0 ? _8n$1 : Fp3.inv(Z2);
    const x2 = modP(X2 * iz);
    const y2 = modP(Y2 * iz);
    const zz = Fp3.mul(Z2, iz);
    if (is0)
      return { x: _0n, y: _1n$1 };
    if (zz !== _1n$1)
      throw new Error("invZ was invalid");
    return { x: x2, y: y2 };
  });
  const assertValidMemo = memoized((p2) => {
    const { a: a2, d: d2 } = CURVE;
    if (p2.is0())
      throw new Error("bad point: ZERO");
    const { X: X2, Y: Y2, Z: Z2, T: T2 } = p2;
    const X22 = modP(X2 * X2);
    const Y22 = modP(Y2 * Y2);
    const Z22 = modP(Z2 * Z2);
    const Z4 = modP(Z22 * Z22);
    const aX2 = modP(X22 * a2);
    const left = modP(Z22 * modP(aX2 + Y22));
    const right = modP(Z4 + modP(d2 * modP(X22 * Y22)));
    if (left !== right)
      throw new Error("bad point: equation left != right (1)");
    const XY = modP(X2 * Y2);
    const ZT = modP(Z2 * T2);
    if (XY !== ZT)
      throw new Error("bad point: equation left != right (2)");
    return true;
  });
  class Point {
    constructor(X2, Y2, Z2, T2) {
      this.X = acoord("x", X2);
      this.Y = acoord("y", Y2);
      this.Z = acoord("z", Z2, true);
      this.T = acoord("t", T2);
      Object.freeze(this);
    }
    static CURVE() {
      return CURVE;
    }
    static fromAffine(p2) {
      if (p2 instanceof Point)
        throw new Error("extended point not allowed");
      const { x: x2, y: y2 } = p2 || {};
      acoord("x", x2);
      acoord("y", y2);
      return new Point(x2, y2, _1n$1, modP(x2 * y2));
    }
    // Uses algo from RFC8032 5.1.3.
    static fromBytes(bytes, zip215 = false) {
      const len = Fp3.BYTES;
      const { a: a2, d: d2 } = CURVE;
      bytes = copyBytes(_abytes2(bytes, len, "point"));
      _abool2(zip215, "zip215");
      const normed = copyBytes(bytes);
      const lastByte = bytes[len - 1];
      normed[len - 1] = lastByte & -129;
      const y2 = bytesToNumberLE(normed);
      const max = zip215 ? MASK : Fp3.ORDER;
      aInRange("point.y", y2, _0n, max);
      const y22 = modP(y2 * y2);
      const u = modP(y22 - _1n$1);
      const v2 = modP(d2 * y22 - a2);
      let { isValid, value: x2 } = uvRatio2(u, v2);
      if (!isValid)
        throw new Error("bad point: invalid y coordinate");
      const isXOdd = (x2 & _1n$1) === _1n$1;
      const isLastByteOdd = (lastByte & 128) !== 0;
      if (!zip215 && x2 === _0n && isLastByteOdd)
        throw new Error("bad point: x=0 and x_0=1");
      if (isLastByteOdd !== isXOdd)
        x2 = modP(-x2);
      return Point.fromAffine({ x: x2, y: y2 });
    }
    static fromHex(bytes, zip215 = false) {
      return Point.fromBytes(ensureBytes("point", bytes), zip215);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(windowSize = 8, isLazy = true) {
      wnaf.createCache(this, windowSize);
      if (!isLazy)
        this.multiply(_2n$1);
      return this;
    }
    // Useful in fromAffine() - not for fromBytes(), which always created valid points.
    assertValidity() {
      assertValidMemo(this);
    }
    // Compare one point to another.
    equals(other) {
      aextpoint(other);
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const { X: X2, Y: Y2, Z: Z2 } = other;
      const X1Z2 = modP(X1 * Z2);
      const X2Z1 = modP(X2 * Z1);
      const Y1Z2 = modP(Y1 * Z2);
      const Y2Z1 = modP(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    is0() {
      return this.equals(Point.ZERO);
    }
    negate() {
      return new Point(modP(-this.X), this.Y, this.Z, modP(-this.T));
    }
    // Fast algo for doubling Extended Point.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#doubling-dbl-2008-hwcd
    // Cost: 4M + 4S + 1*a + 6add + 1*2.
    double() {
      const { a: a2 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1 } = this;
      const A2 = modP(X1 * X1);
      const B2 = modP(Y1 * Y1);
      const C2 = modP(_2n$1 * modP(Z1 * Z1));
      const D = modP(a2 * A2);
      const x1y1 = X1 + Y1;
      const E2 = modP(modP(x1y1 * x1y1) - A2 - B2);
      const G2 = D + B2;
      const F2 = G2 - C2;
      const H2 = D - B2;
      const X3 = modP(E2 * F2);
      const Y3 = modP(G2 * H2);
      const T3 = modP(E2 * H2);
      const Z3 = modP(F2 * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    // Fast algo for adding 2 Extended Points.
    // https://hyperelliptic.org/EFD/g1p/auto-twisted-extended.html#addition-add-2008-hwcd
    // Cost: 9M + 1*a + 1*d + 7add.
    add(other) {
      aextpoint(other);
      const { a: a2, d: d2 } = CURVE;
      const { X: X1, Y: Y1, Z: Z1, T: T1 } = this;
      const { X: X2, Y: Y2, Z: Z2, T: T2 } = other;
      const A2 = modP(X1 * X2);
      const B2 = modP(Y1 * Y2);
      const C2 = modP(T1 * d2 * T2);
      const D = modP(Z1 * Z2);
      const E2 = modP((X1 + Y1) * (X2 + Y2) - A2 - B2);
      const F2 = D - C2;
      const G2 = D + C2;
      const H2 = modP(B2 - a2 * A2);
      const X3 = modP(E2 * F2);
      const Y3 = modP(G2 * H2);
      const T3 = modP(E2 * H2);
      const Z3 = modP(F2 * G2);
      return new Point(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    // Constant-time multiplication.
    multiply(scalar) {
      if (!Fn.isValidNot0(scalar))
        throw new Error("invalid scalar: expected 1 <= sc < curve.n");
      const { p: p2, f } = wnaf.cached(this, scalar, (p3) => normalizeZ(Point, p3));
      return normalizeZ(Point, [p2, f])[0];
    }
    // Non-constant-time multiplication. Uses double-and-add algorithm.
    // It's faster, but should only be used when you don't care about
    // an exposed private key e.g. sig verification.
    // Does NOT allow scalars higher than CURVE.n.
    // Accepts optional accumulator to merge with multiply (important for sparse scalars)
    multiplyUnsafe(scalar, acc = Point.ZERO) {
      if (!Fn.isValid(scalar))
        throw new Error("invalid scalar: expected 0 <= sc < curve.n");
      if (scalar === _0n)
        return Point.ZERO;
      if (this.is0() || scalar === _1n$1)
        return this;
      return wnaf.unsafe(this, scalar, (p2) => normalizeZ(Point, p2), acc);
    }
    // Checks if point is of small order.
    // If you add something to small order point, you will have "dirty"
    // point with torsion component.
    // Multiplies point by cofactor and checks if the result is 0.
    isSmallOrder() {
      return this.multiplyUnsafe(cofactor).is0();
    }
    // Multiplies point by curve order and checks if the result is 0.
    // Returns `false` is the point is dirty.
    isTorsionFree() {
      return wnaf.unsafe(this, CURVE.n).is0();
    }
    // Converts Extended point to default (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    toAffine(invertedZ) {
      return toAffineMemo(this, invertedZ);
    }
    clearCofactor() {
      if (cofactor === _1n$1)
        return this;
      return this.multiplyUnsafe(cofactor);
    }
    toBytes() {
      const { x: x2, y: y2 } = this.toAffine();
      const bytes = Fp3.toBytes(y2);
      bytes[bytes.length - 1] |= x2 & _1n$1 ? 128 : 0;
      return bytes;
    }
    toHex() {
      return bytesToHex(this.toBytes());
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    // TODO: remove
    get ex() {
      return this.X;
    }
    get ey() {
      return this.Y;
    }
    get ez() {
      return this.Z;
    }
    get et() {
      return this.T;
    }
    static normalizeZ(points) {
      return normalizeZ(Point, points);
    }
    static msm(points, scalars) {
      return pippenger(Point, Fn, points, scalars);
    }
    _setWindowSize(windowSize) {
      this.precompute(windowSize);
    }
    toRawBytes() {
      return this.toBytes();
    }
  }
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy, _1n$1, modP(CURVE.Gx * CURVE.Gy));
  Point.ZERO = new Point(_0n, _1n$1, _1n$1, _0n);
  Point.Fp = Fp3;
  Point.Fn = Fn;
  const wnaf = new wNAF(Point, Fn.BITS);
  Point.BASE.precompute(8);
  return Point;
}
function eddsa(Point, cHash, eddsaOpts = {}) {
  if (typeof cHash !== "function")
    throw new Error('"hash" function param is required');
  _validateObject(eddsaOpts, {}, {
    adjustScalarBytes: "function",
    randomBytes: "function",
    domain: "function",
    prehash: "function",
    mapToCurve: "function"
  });
  const { prehash } = eddsaOpts;
  const { BASE, Fp: Fp3, Fn } = Point;
  const randomBytes$1 = eddsaOpts.randomBytes || randomBytes;
  const adjustScalarBytes2 = eddsaOpts.adjustScalarBytes || ((bytes) => bytes);
  const domain = eddsaOpts.domain || ((data, ctx, phflag) => {
    _abool2(phflag, "phflag");
    if (ctx.length || phflag)
      throw new Error("Contexts/pre-hash are not supported");
    return data;
  });
  function modN_LE(hash) {
    return Fn.create(bytesToNumberLE(hash));
  }
  function getPrivateScalar(key) {
    const len = lengths.secretKey;
    key = ensureBytes("private key", key, len);
    const hashed = ensureBytes("hashed private key", cHash(key), 2 * len);
    const head = adjustScalarBytes2(hashed.slice(0, len));
    const prefix = hashed.slice(len, 2 * len);
    const scalar = modN_LE(head);
    return { head, prefix, scalar };
  }
  function getExtendedPublicKey(secretKey) {
    const { head, prefix, scalar } = getPrivateScalar(secretKey);
    const point = BASE.multiply(scalar);
    const pointBytes = point.toBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  function getPublicKey(secretKey) {
    return getExtendedPublicKey(secretKey).pointBytes;
  }
  function hashDomainToScalar(context = Uint8Array.of(), ...msgs) {
    const msg = concatBytes(...msgs);
    return modN_LE(cHash(domain(msg, ensureBytes("context", context), !!prehash)));
  }
  function sign(msg, secretKey, options = {}) {
    msg = ensureBytes("message", msg);
    if (prehash)
      msg = prehash(msg);
    const { prefix, scalar, pointBytes } = getExtendedPublicKey(secretKey);
    const r2 = hashDomainToScalar(options.context, prefix, msg);
    const R2 = BASE.multiply(r2).toBytes();
    const k2 = hashDomainToScalar(options.context, R2, pointBytes, msg);
    const s2 = Fn.create(r2 + k2 * scalar);
    if (!Fn.isValid(s2))
      throw new Error("sign failed: invalid s");
    const rs = concatBytes(R2, Fn.toBytes(s2));
    return _abytes2(rs, lengths.signature, "result");
  }
  const verifyOpts = { zip215: true };
  function verify(sig, msg, publicKey, options = verifyOpts) {
    const { context, zip215 } = options;
    const len = lengths.signature;
    sig = ensureBytes("signature", sig, len);
    msg = ensureBytes("message", msg);
    publicKey = ensureBytes("publicKey", publicKey, lengths.publicKey);
    if (zip215 !== void 0)
      _abool2(zip215, "zip215");
    if (prehash)
      msg = prehash(msg);
    const mid = len / 2;
    const r2 = sig.subarray(0, mid);
    const s2 = bytesToNumberLE(sig.subarray(mid, len));
    let A2, R2, SB;
    try {
      A2 = Point.fromBytes(publicKey, zip215);
      R2 = Point.fromBytes(r2, zip215);
      SB = BASE.multiplyUnsafe(s2);
    } catch (error) {
      return false;
    }
    if (!zip215 && A2.isSmallOrder())
      return false;
    const k2 = hashDomainToScalar(context, R2.toBytes(), A2.toBytes(), msg);
    const RkA = R2.add(A2.multiplyUnsafe(k2));
    return RkA.subtract(SB).clearCofactor().is0();
  }
  const _size = Fp3.BYTES;
  const lengths = {
    secretKey: _size,
    publicKey: _size,
    signature: 2 * _size,
    seed: _size
  };
  function randomSecretKey(seed = randomBytes$1(lengths.seed)) {
    return _abytes2(seed, lengths.seed, "seed");
  }
  function keygen(seed) {
    const secretKey = utils.randomSecretKey(seed);
    return { secretKey, publicKey: getPublicKey(secretKey) };
  }
  function isValidSecretKey(key) {
    return isBytes(key) && key.length === Fn.BYTES;
  }
  function isValidPublicKey(key, zip215) {
    try {
      return !!Point.fromBytes(key, zip215);
    } catch (error) {
      return false;
    }
  }
  const utils = {
    getExtendedPublicKey,
    randomSecretKey,
    isValidSecretKey,
    isValidPublicKey,
    /**
     * Converts ed public key to x public key. Uses formula:
     * - ed25519:
     *   - `(u, v) = ((1+y)/(1-y), sqrt(-486664)*u/x)`
     *   - `(x, y) = (sqrt(-486664)*u/v, (u-1)/(u+1))`
     * - ed448:
     *   - `(u, v) = ((y-1)/(y+1), sqrt(156324)*u/x)`
     *   - `(x, y) = (sqrt(156324)*u/v, (1+u)/(1-u))`
     */
    toMontgomery(publicKey) {
      const { y: y2 } = Point.fromBytes(publicKey);
      const size = lengths.publicKey;
      const is25519 = size === 32;
      if (!is25519 && size !== 57)
        throw new Error("only defined for 25519 and 448");
      const u = is25519 ? Fp3.div(_1n$1 + y2, _1n$1 - y2) : Fp3.div(y2 - _1n$1, y2 + _1n$1);
      return Fp3.toBytes(u);
    },
    toMontgomerySecret(secretKey) {
      const size = lengths.secretKey;
      _abytes2(secretKey, size);
      const hashed = cHash(secretKey.subarray(0, size));
      return adjustScalarBytes2(hashed).subarray(0, size);
    },
    /** @deprecated */
    randomPrivateKey: randomSecretKey,
    /** @deprecated */
    precompute(windowSize = 8, point = Point.BASE) {
      return point.precompute(windowSize, false);
    }
  };
  return Object.freeze({
    keygen,
    getPublicKey,
    sign,
    verify,
    utils,
    Point,
    lengths
  });
}
function _eddsa_legacy_opts_to_new(c2) {
  const CURVE = {
    a: c2.a,
    d: c2.d,
    p: c2.Fp.ORDER,
    n: c2.n,
    h: c2.h,
    Gx: c2.Gx,
    Gy: c2.Gy
  };
  const Fp3 = c2.Fp;
  const Fn = Field(CURVE.n, c2.nBitLength, true);
  const curveOpts = { Fp: Fp3, Fn, uvRatio: c2.uvRatio };
  const eddsaOpts = {
    randomBytes: c2.randomBytes,
    adjustScalarBytes: c2.adjustScalarBytes,
    domain: c2.domain,
    prehash: c2.prehash,
    mapToCurve: c2.mapToCurve
  };
  return { CURVE, curveOpts, hash: c2.hash, eddsaOpts };
}
function _eddsa_new_output_to_legacy(c2, eddsa2) {
  const Point = eddsa2.Point;
  const legacy = Object.assign({}, eddsa2, {
    ExtendedPoint: Point,
    CURVE: c2,
    nBitLength: Point.Fn.BITS,
    nByteLength: Point.Fn.BYTES
  });
  return legacy;
}
function twistedEdwards(c2) {
  const { CURVE, curveOpts, hash, eddsaOpts } = _eddsa_legacy_opts_to_new(c2);
  const Point = edwards(CURVE, curveOpts);
  const EDDSA = eddsa(Point, hash, eddsaOpts);
  return _eddsa_new_output_to_legacy(c2, EDDSA);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _1n = BigInt(1), _2n = BigInt(2);
BigInt(3);
const _5n = BigInt(5), _8n = BigInt(8);
const ed25519_CURVE_p = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed");
const ed25519_CURVE = /* @__PURE__ */ (() => ({
  p: ed25519_CURVE_p,
  n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
  h: _8n,
  a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
  d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
  Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
  Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
}))();
function ed25519_pow_2_252_3(x2) {
  const _10n = BigInt(10), _20n = BigInt(20), _40n = BigInt(40), _80n = BigInt(80);
  const P2 = ed25519_CURVE_p;
  const x22 = x2 * x2 % P2;
  const b2 = x22 * x2 % P2;
  const b4 = pow2(b2, _2n, P2) * b2 % P2;
  const b5 = pow2(b4, _1n, P2) * x2 % P2;
  const b10 = pow2(b5, _5n, P2) * b5 % P2;
  const b20 = pow2(b10, _10n, P2) * b10 % P2;
  const b40 = pow2(b20, _20n, P2) * b20 % P2;
  const b80 = pow2(b40, _40n, P2) * b40 % P2;
  const b160 = pow2(b80, _80n, P2) * b80 % P2;
  const b240 = pow2(b160, _80n, P2) * b80 % P2;
  const b250 = pow2(b240, _10n, P2) * b10 % P2;
  const pow_p_5_8 = pow2(b250, _2n, P2) * x2 % P2;
  return { pow_p_5_8, b2 };
}
function adjustScalarBytes(bytes) {
  bytes[0] &= 248;
  bytes[31] &= 127;
  bytes[31] |= 64;
  return bytes;
}
const ED25519_SQRT_M1 = /* @__PURE__ */ BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
function uvRatio(u, v2) {
  const P2 = ed25519_CURVE_p;
  const v3 = mod(v2 * v2 * v2, P2);
  const v7 = mod(v3 * v3 * v2, P2);
  const pow = ed25519_pow_2_252_3(u * v7).pow_p_5_8;
  let x2 = mod(u * v3 * pow, P2);
  const vx2 = mod(v2 * x2 * x2, P2);
  const root1 = x2;
  const root2 = mod(x2 * ED25519_SQRT_M1, P2);
  const useRoot1 = vx2 === u;
  const useRoot2 = vx2 === mod(-u, P2);
  const noRoot = vx2 === mod(-u * ED25519_SQRT_M1, P2);
  if (useRoot1)
    x2 = root1;
  if (useRoot2 || noRoot)
    x2 = root2;
  if (isNegativeLE(x2, P2))
    x2 = mod(-x2, P2);
  return { isValid: useRoot1 || useRoot2, value: x2 };
}
const Fp = /* @__PURE__ */ (() => Field(ed25519_CURVE.p, { isLE: true }))();
const ed25519Defaults = /* @__PURE__ */ (() => ({
  ...ed25519_CURVE,
  Fp,
  hash: sha512,
  adjustScalarBytes,
  // dom2
  // Ratio of u to v. Allows us to combine inversion and square root. Uses algo from RFC8032 5.1.3.
  // Constant-time, u/√v
  uvRatio
}))();
const ed25519 = /* @__PURE__ */ (() => twistedEdwards(ed25519Defaults))();
var _a, _b;
class ExpirableMap {
  /**
   * Create a new ExpirableMap.
   * @param {ExpirableMapOptions<any, any>} options - options for the map.
   * @param {Iterable<[any, any]>} options.source - an optional source of entries to initialize the map with.
   * @param {number} options.expirationTime - the time in milliseconds after which entries will expire.
   */
  constructor(options = {}) {
    // Internals
    __privateAdd(this, _inner);
    __privateAdd(this, _expirationTime);
    this[_a] = this.entries.bind(this);
    this[_b] = "ExpirableMap";
    const { source = [], expirationTime = 10 * 60 * 1e3 } = options;
    const currentTime = Date.now();
    __privateSet(this, _inner, new Map([...source].map(([key, value]) => [key, { value, timestamp: currentTime }])));
    __privateSet(this, _expirationTime, expirationTime);
  }
  /**
   * Prune removes all expired entries.
   */
  prune() {
    const currentTime = Date.now();
    for (const [key, entry] of __privateGet(this, _inner).entries()) {
      if (currentTime - entry.timestamp > __privateGet(this, _expirationTime)) {
        __privateGet(this, _inner).delete(key);
      }
    }
    return this;
  }
  // Implementing the Map interface
  /**
   * Set the value for the given key. Prunes expired entries.
   * @param key for the entry
   * @param value of the entry
   * @returns this
   */
  set(key, value) {
    this.prune();
    const entry = {
      value,
      timestamp: Date.now()
    };
    __privateGet(this, _inner).set(key, entry);
    return this;
  }
  /**
   * Get the value associated with the key, if it exists and has not expired.
   * @param key K
   * @returns the value associated with the key, or undefined if the key is not present or has expired.
   */
  get(key) {
    const entry = __privateGet(this, _inner).get(key);
    if (entry === void 0) {
      return void 0;
    }
    if (Date.now() - entry.timestamp > __privateGet(this, _expirationTime)) {
      __privateGet(this, _inner).delete(key);
      return void 0;
    }
    return entry.value;
  }
  /**
   * Clear all entries.
   */
  clear() {
    __privateGet(this, _inner).clear();
  }
  /**
   * Entries returns the entries of the map, without the expiration time.
   * @returns an iterator over the entries of the map.
   */
  entries() {
    const iterator = __privateGet(this, _inner).entries();
    const generator = function* () {
      for (const [key, value] of iterator) {
        yield [key, value.value];
      }
      return void 0;
    };
    return generator();
  }
  /**
   * Values returns the values of the map, without the expiration time.
   * @returns an iterator over the values of the map.
   */
  values() {
    const iterator = __privateGet(this, _inner).values();
    const generator = function* () {
      for (const value of iterator) {
        yield value.value;
      }
      return void 0;
    };
    return generator();
  }
  /**
   * Keys returns the keys of the map
   * @returns an iterator over the keys of the map.
   */
  keys() {
    return __privateGet(this, _inner).keys();
  }
  /**
   * forEach calls the callbackfn on each entry of the map.
   * @param callbackfn to call on each entry
   * @param thisArg to use as this when calling the callbackfn
   */
  forEach(callbackfn, thisArg) {
    for (const [key, value] of __privateGet(this, _inner).entries()) {
      callbackfn.call(thisArg, value.value, key, this);
    }
  }
  /**
   * has returns true if the key exists and has not expired.
   * @param key K
   * @returns true if the key exists and has not expired.
   */
  has(key) {
    return __privateGet(this, _inner).has(key);
  }
  /**
   * delete the entry for the given key.
   * @param key K
   * @returns true if the key existed and has been deleted.
   */
  delete(key) {
    return __privateGet(this, _inner).delete(key);
  }
  /**
   * get size of the map.
   * @returns the size of the map.
   */
  get size() {
    return __privateGet(this, _inner).size;
  }
}
_inner = new WeakMap();
_expirationTime = new WeakMap();
_a = Symbol.iterator, _b = Symbol.toStringTag;
const encodeLenBytes = (len) => {
  if (len <= 127) {
    return 1;
  } else if (len <= 255) {
    return 2;
  } else if (len <= 65535) {
    return 3;
  } else if (len <= 16777215) {
    return 4;
  } else {
    throw InputError.fromCode(new DerEncodeErrorCode("Length too long (> 4 bytes)"));
  }
};
const encodeLen = (buf, offset, len) => {
  if (len <= 127) {
    buf[offset] = len;
    return 1;
  } else if (len <= 255) {
    buf[offset] = 129;
    buf[offset + 1] = len;
    return 2;
  } else if (len <= 65535) {
    buf[offset] = 130;
    buf[offset + 1] = len >> 8;
    buf[offset + 2] = len;
    return 3;
  } else if (len <= 16777215) {
    buf[offset] = 131;
    buf[offset + 1] = len >> 16;
    buf[offset + 2] = len >> 8;
    buf[offset + 3] = len;
    return 4;
  } else {
    throw InputError.fromCode(new DerEncodeErrorCode("Length too long (> 4 bytes)"));
  }
};
const decodeLenBytes = (buf, offset) => {
  if (buf[offset] < 128)
    return 1;
  if (buf[offset] === 128)
    throw InputError.fromCode(new DerDecodeErrorCode("Invalid length 0"));
  if (buf[offset] === 129)
    return 2;
  if (buf[offset] === 130)
    return 3;
  if (buf[offset] === 131)
    return 4;
  throw InputError.fromCode(new DerDecodeErrorCode("Length too long (> 4 bytes)"));
};
const decodeLen = (buf, offset) => {
  const lenBytes = decodeLenBytes(buf, offset);
  if (lenBytes === 1)
    return buf[offset];
  else if (lenBytes === 2)
    return buf[offset + 1];
  else if (lenBytes === 3)
    return (buf[offset + 1] << 8) + buf[offset + 2];
  else if (lenBytes === 4)
    return (buf[offset + 1] << 16) + (buf[offset + 2] << 8) + buf[offset + 3];
  throw InputError.fromCode(new DerDecodeErrorCode("Length too long (> 4 bytes)"));
};
Uint8Array.from([
  ...[48, 12],
  // SEQUENCE
  ...[6, 10],
  // OID with 10 bytes
  ...[43, 6, 1, 4, 1, 131, 184, 67, 1, 1]
  // DER encoded COSE
]);
const ED25519_OID = Uint8Array.from([
  ...[48, 5],
  // SEQUENCE
  ...[6, 3],
  // OID with 3 bytes
  ...[43, 101, 112]
  // id-Ed25519 OID
]);
Uint8Array.from([
  ...[48, 16],
  // SEQUENCE
  ...[6, 7],
  // OID with 7 bytes
  ...[42, 134, 72, 206, 61, 2, 1],
  // OID ECDSA
  ...[6, 5],
  // OID with 5 bytes
  ...[43, 129, 4, 0, 10]
  // OID secp256k1
]);
Uint8Array.from([
  ...[48, 29],
  // SEQUENCE, length 29 bytes
  // Algorithm OID
  ...[6, 13],
  ...[43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 1, 2, 1],
  // Curve OID
  ...[6, 12],
  ...[43, 6, 1, 4, 1, 130, 220, 124, 5, 3, 2, 1]
]);
function wrapDER(payload, oid) {
  const bitStringHeaderLength = 2 + encodeLenBytes(payload.byteLength + 1);
  const len = oid.byteLength + bitStringHeaderLength + payload.byteLength;
  let offset = 0;
  const buf = new Uint8Array(1 + encodeLenBytes(len) + len);
  buf[offset++] = 48;
  offset += encodeLen(buf, offset, len);
  buf.set(oid, offset);
  offset += oid.byteLength;
  buf[offset++] = 3;
  offset += encodeLen(buf, offset, payload.byteLength + 1);
  buf[offset++] = 0;
  buf.set(new Uint8Array(payload), offset);
  return buf;
}
const unwrapDER = (derEncoded, oid) => {
  let offset = 0;
  const expect = (n, msg) => {
    if (buf[offset++] !== n) {
      throw InputError.fromCode(new DerDecodeErrorCode(`Expected ${msg} at offset ${offset}`));
    }
  };
  const buf = new Uint8Array(derEncoded);
  expect(48, "sequence");
  offset += decodeLenBytes(buf, offset);
  if (!uint8Equals(buf.slice(offset, offset + oid.byteLength), oid)) {
    throw InputError.fromCode(new DerDecodeErrorCode("Not the expected OID."));
  }
  offset += oid.byteLength;
  expect(3, "bit string");
  const payloadLen = decodeLen(buf, offset) - 1;
  offset += decodeLenBytes(buf, offset);
  expect(0, "0 padding");
  const result = buf.slice(offset);
  if (payloadLen !== result.length) {
    throw InputError.fromCode(new DerDecodeLengthMismatchErrorCode(payloadLen, result.length));
  }
  return result;
};
const _Ed25519PublicKey = class _Ed25519PublicKey {
  // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
  constructor(key) {
    __privateAdd(this, _rawKey);
    __privateAdd(this, _derKey);
    if (key.byteLength !== _Ed25519PublicKey.RAW_KEY_LENGTH) {
      throw InputError.fromCode(new DerDecodeErrorCode("An Ed25519 public key must be exactly 32 bytes long"));
    }
    __privateSet(this, _rawKey, key);
    __privateSet(this, _derKey, _Ed25519PublicKey.derEncode(key));
  }
  static from(key) {
    return this.fromDer(key.toDer());
  }
  static fromRaw(rawKey) {
    return new _Ed25519PublicKey(rawKey);
  }
  static fromDer(derKey) {
    return new _Ed25519PublicKey(this.derDecode(derKey));
  }
  static derEncode(publicKey) {
    return wrapDER(publicKey, ED25519_OID);
  }
  static derDecode(key) {
    const unwrapped = unwrapDER(key, ED25519_OID);
    if (unwrapped.length !== this.RAW_KEY_LENGTH) {
      throw InputError.fromCode(new DerDecodeErrorCode("An Ed25519 public key must be exactly 32 bytes long"));
    }
    return unwrapped;
  }
  get rawKey() {
    return __privateGet(this, _rawKey);
  }
  get derKey() {
    return __privateGet(this, _derKey);
  }
  toDer() {
    return this.derKey;
  }
  toRaw() {
    return this.rawKey;
  }
};
_rawKey = new WeakMap();
_derKey = new WeakMap();
_Ed25519PublicKey.RAW_KEY_LENGTH = 32;
let Ed25519PublicKey = _Ed25519PublicKey;
class Observable {
  constructor() {
    this.observers = [];
  }
  subscribe(func) {
    this.observers.push(func);
  }
  unsubscribe(func) {
    this.observers = this.observers.filter((observer) => observer !== func);
  }
  notify(data, ...rest) {
    this.observers.forEach((observer) => observer(data, ...rest));
  }
}
class ObservableLog extends Observable {
  constructor() {
    super();
  }
  print(message, ...rest) {
    this.notify({ message, level: "info" }, ...rest);
  }
  warn(message, ...rest) {
    this.notify({ message, level: "warn" }, ...rest);
  }
  error(message, error, ...rest) {
    this.notify({ message, level: "error", error }, ...rest);
  }
}
const RANDOMIZATION_FACTOR = 0.5;
const MULTIPLIER = 1.5;
const INITIAL_INTERVAL_MSEC = 500;
const MAX_INTERVAL_MSEC = 6e4;
const MAX_ELAPSED_TIME_MSEC = 9e5;
const MAX_ITERATIONS = 10;
const _ExponentialBackoff = class _ExponentialBackoff {
  constructor(options = _ExponentialBackoff.default) {
    __privateAdd(this, _currentInterval);
    __privateAdd(this, _randomizationFactor);
    __privateAdd(this, _multiplier);
    __privateAdd(this, _maxInterval);
    __privateAdd(this, _startTime);
    __privateAdd(this, _maxElapsedTime);
    __privateAdd(this, _maxIterations);
    __privateAdd(this, _date);
    __privateAdd(this, _count, 0);
    const { initialInterval = INITIAL_INTERVAL_MSEC, randomizationFactor = RANDOMIZATION_FACTOR, multiplier = MULTIPLIER, maxInterval = MAX_INTERVAL_MSEC, maxElapsedTime = MAX_ELAPSED_TIME_MSEC, maxIterations = MAX_ITERATIONS, date = Date } = options;
    __privateSet(this, _currentInterval, initialInterval);
    __privateSet(this, _randomizationFactor, randomizationFactor);
    __privateSet(this, _multiplier, multiplier);
    __privateSet(this, _maxInterval, maxInterval);
    __privateSet(this, _date, date);
    __privateSet(this, _startTime, date.now());
    __privateSet(this, _maxElapsedTime, maxElapsedTime);
    __privateSet(this, _maxIterations, maxIterations);
  }
  get ellapsedTimeInMsec() {
    return __privateGet(this, _date).now() - __privateGet(this, _startTime);
  }
  get currentInterval() {
    return __privateGet(this, _currentInterval);
  }
  get count() {
    return __privateGet(this, _count);
  }
  get randomValueFromInterval() {
    const delta = __privateGet(this, _randomizationFactor) * __privateGet(this, _currentInterval);
    const min = __privateGet(this, _currentInterval) - delta;
    const max = __privateGet(this, _currentInterval) + delta;
    return Math.random() * (max - min) + min;
  }
  incrementCurrentInterval() {
    __privateSet(this, _currentInterval, Math.min(__privateGet(this, _currentInterval) * __privateGet(this, _multiplier), __privateGet(this, _maxInterval)));
    __privateWrapper(this, _count)._++;
    return __privateGet(this, _currentInterval);
  }
  next() {
    if (this.ellapsedTimeInMsec >= __privateGet(this, _maxElapsedTime) || __privateGet(this, _count) >= __privateGet(this, _maxIterations)) {
      return null;
    } else {
      this.incrementCurrentInterval();
      return this.randomValueFromInterval;
    }
  }
};
_currentInterval = new WeakMap();
_randomizationFactor = new WeakMap();
_multiplier = new WeakMap();
_maxInterval = new WeakMap();
_startTime = new WeakMap();
_maxElapsedTime = new WeakMap();
_maxIterations = new WeakMap();
_date = new WeakMap();
_count = new WeakMap();
_ExponentialBackoff.default = {
  initialInterval: INITIAL_INTERVAL_MSEC,
  randomizationFactor: RANDOMIZATION_FACTOR,
  multiplier: MULTIPLIER,
  maxInterval: MAX_INTERVAL_MSEC,
  // 1 minute
  maxElapsedTime: MAX_ELAPSED_TIME_MSEC,
  maxIterations: MAX_ITERATIONS,
  date: Date
};
let ExponentialBackoff = _ExponentialBackoff;
var RequestStatusResponseStatus;
(function(RequestStatusResponseStatus2) {
  RequestStatusResponseStatus2["Received"] = "received";
  RequestStatusResponseStatus2["Processing"] = "processing";
  RequestStatusResponseStatus2["Replied"] = "replied";
  RequestStatusResponseStatus2["Rejected"] = "rejected";
  RequestStatusResponseStatus2["Unknown"] = "unknown";
  RequestStatusResponseStatus2["Done"] = "done";
})(RequestStatusResponseStatus || (RequestStatusResponseStatus = {}));
const MINUTE_TO_MSECS = 60 * 1e3;
const MSECS_TO_NANOSECONDS = 1e6;
const DEFAULT_TIME_DIFF_MSECS = 0;
const IC_ROOT_KEY = "308182301d060d2b0601040182dc7c0503010201060c2b0601040182dc7c05030201036100814c0e6ec71fab583b08bd81373c255c3c371b2e84863c98a4f1e08b74235d14fb5d9c0cd546d9685f913a0c0b2cc5341583bf4b4392e467db96d65b9bb4cb717112f8472e0d5a4d14505ffd7484b01291091c5f87b98883463f98091a0baaae";
const IC0_DOMAIN = "ic0.app";
const IC0_SUB_DOMAIN = ".ic0.app";
const ICP0_DOMAIN = "icp0.io";
const ICP0_SUB_DOMAIN = ".icp0.io";
const ICP_API_DOMAIN = "icp-api.io";
const ICP_API_SUB_DOMAIN = ".icp-api.io";
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_ACCEPTED = 202;
const HTTP_STATUS_NOT_FOUND = 404;
function getDefaultFetch() {
  let defaultFetch;
  if (typeof window !== "undefined") {
    if (window.fetch) {
      defaultFetch = window.fetch.bind(window);
    } else {
      throw ExternalError.fromCode(new HttpDefaultFetchErrorCode("Fetch implementation was not available. You appear to be in a browser context, but window.fetch was not present."));
    }
  } else if (typeof global !== "undefined") {
    if (global.fetch) {
      defaultFetch = global.fetch.bind(global);
    } else {
      throw ExternalError.fromCode(new HttpDefaultFetchErrorCode("Fetch implementation was not available. You appear to be in a Node.js context, but global.fetch was not available."));
    }
  } else if (typeof self !== "undefined") {
    if (self.fetch) {
      defaultFetch = self.fetch.bind(self);
    }
  }
  if (defaultFetch) {
    return defaultFetch;
  }
  throw ExternalError.fromCode(new HttpDefaultFetchErrorCode("Fetch implementation was not available. Please provide fetch to the HttpAgent constructor, or ensure it is available in the window or global context."));
}
function determineHost(configuredHost) {
  let host;
  if (configuredHost !== void 0) {
    if (!configuredHost.match(/^[a-z]+:/) && typeof window !== "undefined") {
      host = new URL(window.location.protocol + "//" + configuredHost);
    } else {
      host = new URL(configuredHost);
    }
  } else {
    const knownHosts = ["ic0.app", "icp0.io", "127.0.0.1", "localhost"];
    const remoteHosts = [".github.dev", ".gitpod.io"];
    const location = typeof window !== "undefined" ? window.location : void 0;
    const hostname = location == null ? void 0 : location.hostname;
    let knownHost;
    if (hostname && typeof hostname === "string") {
      if (remoteHosts.some((host2) => hostname.endsWith(host2))) {
        knownHost = hostname;
      } else {
        knownHost = knownHosts.find((host2) => hostname.endsWith(host2));
      }
    }
    if (location && knownHost) {
      host = new URL(`${location.protocol}//${knownHost}${location.port ? ":" + location.port : ""}`);
    } else {
      host = new URL("https://icp-api.io");
    }
  }
  return host.toString();
}
const _HttpAgent = class _HttpAgent {
  /**
   * @param options - Options for the HttpAgent
   * @deprecated Use `HttpAgent.create` or `HttpAgent.createSync` instead
   */
  constructor(options = {}) {
    __privateAdd(this, _HttpAgent_instances);
    __privateAdd(this, _rootKeyPromise);
    __privateAdd(this, _shouldFetchRootKey);
    __privateAdd(this, _timeDiffMsecs);
    __privateAdd(this, _hasSyncedTime);
    __privateAdd(this, _syncTimePromise);
    __privateAdd(this, _shouldSyncTime);
    __privateAdd(this, _identity);
    __privateAdd(this, _fetch);
    __privateAdd(this, _fetchOptions);
    __privateAdd(this, _callOptions);
    __privateAdd(this, _credentials);
    __privateAdd(this, _retryTimes);
    // Retry requests N times before erroring by default
    __privateAdd(this, _backoffStrategy);
    __privateAdd(this, _maxIngressExpiryInMinutes);
    __privateAdd(this, _queryPipeline);
    __privateAdd(this, _updatePipeline);
    __privateAdd(this, _subnetKeys);
    __privateAdd(this, _verifyQuerySignatures);
    /**
     * See https://internetcomputer.org/docs/current/references/ic-interface-spec/#http-query for details on validation
     * @param queryResponse - The response from the query
     * @param subnetStatus - The subnet status, including all node keys
     * @returns ApiQueryResponse
     */
    __privateAdd(this, _verifyQueryResponse);
    __privateSet(this, _rootKeyPromise, null);
    __privateSet(this, _shouldFetchRootKey, false);
    __privateSet(this, _timeDiffMsecs, DEFAULT_TIME_DIFF_MSECS);
    __privateSet(this, _hasSyncedTime, false);
    __privateSet(this, _syncTimePromise, null);
    __privateSet(this, _shouldSyncTime, false);
    this._isAgent = true;
    this.config = {};
    this.log = new ObservableLog();
    __privateSet(this, _queryPipeline, []);
    __privateSet(this, _updatePipeline, []);
    __privateSet(this, _subnetKeys, new ExpirableMap({
      expirationTime: 5 * MINUTE_TO_MSECS
    }));
    __privateSet(this, _verifyQuerySignatures, true);
    __privateSet(this, _verifyQueryResponse, (queryResponse, subnetStatus) => {
      if (__privateGet(this, _verifyQuerySignatures) === false) {
        return queryResponse;
      }
      const { status, signatures = [], requestId } = queryResponse;
      for (const sig of signatures) {
        const { timestamp, identity } = sig;
        const nodeId = Principal$2.fromUint8Array(identity).toText();
        let hash;
        if (status === QueryResponseStatus.Replied) {
          const { reply } = queryResponse;
          hash = hashOfMap({
            status,
            reply,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else if (status === QueryResponseStatus.Rejected) {
          const { reject_code, reject_message, error_code } = queryResponse;
          hash = hashOfMap({
            status,
            reject_code,
            reject_message,
            error_code,
            timestamp: BigInt(timestamp),
            request_id: requestId
          });
        } else {
          throw UnknownError.fromCode(new UnexpectedErrorCode(`Unknown status: ${status}`));
        }
        const separatorWithHash = concatBytes(IC_RESPONSE_DOMAIN_SEPARATOR, hash);
        const pubKey = subnetStatus.nodeKeys.get(nodeId);
        if (!pubKey) {
          throw ProtocolError.fromCode(new MalformedPublicKeyErrorCode());
        }
        const rawKey = Ed25519PublicKey.fromDer(pubKey).rawKey;
        const valid = ed25519.verify(sig.signature, separatorWithHash, rawKey);
        if (valid)
          return queryResponse;
        throw TrustError.fromCode(new QuerySignatureVerificationFailedErrorCode(nodeId));
      }
      return queryResponse;
    });
    this.config = options;
    __privateSet(this, _fetch, options.fetch || getDefaultFetch() || fetch.bind(global));
    __privateSet(this, _fetchOptions, options.fetchOptions);
    __privateSet(this, _callOptions, options.callOptions);
    __privateSet(this, _shouldFetchRootKey, options.shouldFetchRootKey ?? false);
    __privateSet(this, _shouldSyncTime, options.shouldSyncTime ?? false);
    if (options.rootKey) {
      this.rootKey = options.rootKey;
    } else if (__privateGet(this, _shouldFetchRootKey)) {
      this.rootKey = null;
    } else {
      this.rootKey = hexToBytes(IC_ROOT_KEY);
    }
    const host = determineHost(options.host);
    this.host = new URL(host);
    if (options.verifyQuerySignatures !== void 0) {
      __privateSet(this, _verifyQuerySignatures, options.verifyQuerySignatures);
    }
    __privateSet(this, _retryTimes, options.retryTimes ?? 3);
    const defaultBackoffFactory = () => new ExponentialBackoff({
      maxIterations: __privateGet(this, _retryTimes)
    });
    __privateSet(this, _backoffStrategy, options.backoffStrategy || defaultBackoffFactory);
    if (this.host.hostname.endsWith(IC0_SUB_DOMAIN)) {
      this.host.hostname = IC0_DOMAIN;
    } else if (this.host.hostname.endsWith(ICP0_SUB_DOMAIN)) {
      this.host.hostname = ICP0_DOMAIN;
    } else if (this.host.hostname.endsWith(ICP_API_SUB_DOMAIN)) {
      this.host.hostname = ICP_API_DOMAIN;
    }
    if (options.credentials) {
      const { name, password } = options.credentials;
      __privateSet(this, _credentials, `${name}${password ? ":" + password : ""}`);
    }
    __privateSet(this, _identity, Promise.resolve(options.identity || new AnonymousIdentity()));
    if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes > 5) {
      throw InputError.fromCode(new IngressExpiryInvalidErrorCode("The maximum ingress expiry time is 5 minutes.", options.ingressExpiryInMinutes));
    }
    if (options.ingressExpiryInMinutes && options.ingressExpiryInMinutes <= 0) {
      throw InputError.fromCode(new IngressExpiryInvalidErrorCode("Ingress expiry time must be greater than 0.", options.ingressExpiryInMinutes));
    }
    __privateSet(this, _maxIngressExpiryInMinutes, options.ingressExpiryInMinutes || 5);
    this.addTransform("update", makeNonceTransform(makeNonce));
    if (options.useQueryNonces) {
      this.addTransform("query", makeNonceTransform(makeNonce));
    }
    if (options.logToConsole) {
      this.log.subscribe((log) => {
        if (log.level === "error") {
          console.error(log.message);
        } else if (log.level === "warn") {
          console.warn(log.message);
        } else {
          console.log(log.message);
        }
      });
    }
  }
  static createSync(options = {}) {
    return new this({ ...options });
  }
  static async create(options = {}) {
    var _a2;
    const agent = _HttpAgent.createSync(options);
    await __privateMethod(_a2 = agent, _HttpAgent_instances, asyncGuard_fn).call(_a2);
    return agent;
  }
  static async from(agent) {
    try {
      if ("config" in agent) {
        return await _HttpAgent.create(agent.config);
      }
      return await _HttpAgent.create({
        fetch: agent._fetch,
        fetchOptions: agent._fetchOptions,
        callOptions: agent._callOptions,
        host: agent._host.toString(),
        identity: agent._identity ?? void 0
      });
    } catch {
      throw InputError.fromCode(new CreateHttpAgentErrorCode());
    }
  }
  isLocal() {
    const hostname = this.host.hostname;
    return hostname === "127.0.0.1" || hostname.endsWith("127.0.0.1");
  }
  addTransform(type, fn, priority = fn.priority || 0) {
    if (type === "update") {
      const i = __privateGet(this, _updatePipeline).findIndex((x2) => (x2.priority || 0) < priority);
      __privateGet(this, _updatePipeline).splice(i >= 0 ? i : __privateGet(this, _updatePipeline).length, 0, Object.assign(fn, { priority }));
    } else if (type === "query") {
      const i = __privateGet(this, _queryPipeline).findIndex((x2) => (x2.priority || 0) < priority);
      __privateGet(this, _queryPipeline).splice(i >= 0 ? i : __privateGet(this, _queryPipeline).length, 0, Object.assign(fn, { priority }));
    }
  }
  async getPrincipal() {
    if (!__privateGet(this, _identity)) {
      throw ExternalError.fromCode(new IdentityInvalidErrorCode());
    }
    return (await __privateGet(this, _identity)).getPrincipal();
  }
  /**
   * Makes a call to a canister method.
   * @param canisterId - The ID of the canister to call. Can be a Principal or a string.
   * @param options - Options for the call.
   * @param options.methodName - The name of the method to call.
   * @param options.arg - The argument to pass to the method, as a Uint8Array.
   * @param options.effectiveCanisterId - (Optional) The effective canister ID, if different from the target canister ID.
   * @param options.callSync - (Optional) Whether to use synchronous call mode. Defaults to true.
   * @param options.nonce - (Optional) A unique nonce for the request. If provided, it will override any nonce set by transforms.
   * @param identity - (Optional) The identity to use for the call. If not provided, the agent's current identity will be used.
   * @returns A promise that resolves to the response of the call, including the request ID and response details.
   */
  async call(canisterId, options, identity) {
    const callSync = options.callSync ?? true;
    const id = await (identity ?? __privateGet(this, _identity));
    if (!id) {
      throw ExternalError.fromCode(new IdentityInvalidErrorCode());
    }
    const canister = Principal$2.from(canisterId);
    const ecid = options.effectiveCanisterId ? Principal$2.from(options.effectiveCanisterId) : canister;
    await __privateMethod(this, _HttpAgent_instances, asyncGuard_fn).call(this, ecid);
    const sender = id.getPrincipal();
    const ingress_expiry = calculateIngressExpiry(__privateGet(this, _maxIngressExpiryInMinutes), __privateGet(this, _timeDiffMsecs));
    const submit = {
      request_type: SubmitRequestType.Call,
      canister_id: canister,
      method_name: options.methodName,
      arg: options.arg,
      sender,
      ingress_expiry
    };
    let transformedRequest = await this._transform({
      request: {
        body: null,
        method: "POST",
        headers: {
          "Content-Type": "application/cbor",
          ...__privateGet(this, _credentials) ? { Authorization: "Basic " + btoa(__privateGet(this, _credentials)) } : {}
        }
      },
      endpoint: Endpoint.Call,
      body: submit
    });
    let nonce;
    if (options == null ? void 0 : options.nonce) {
      nonce = toNonce(options.nonce);
    } else if (transformedRequest.body.nonce) {
      nonce = toNonce(transformedRequest.body.nonce);
    } else {
      nonce = void 0;
    }
    submit.nonce = nonce;
    function toNonce(buf) {
      return Object.assign(buf, { __nonce__: void 0 });
    }
    transformedRequest = await id.transformRequest(transformedRequest);
    const body = encode(transformedRequest.body);
    const backoff2 = __privateGet(this, _backoffStrategy).call(this);
    const requestId = requestIdOf(submit);
    try {
      const requestSync = () => {
        this.log.print(`fetching "/api/v3/canister/${ecid.toText()}/call" with request:`, transformedRequest);
        return __privateGet(this, _fetch).call(this, "" + new URL(`/api/v3/canister/${ecid.toText()}/call`, this.host), {
          ...__privateGet(this, _callOptions),
          ...transformedRequest.request,
          body
        });
      };
      const requestAsync = () => {
        this.log.print(`fetching "/api/v2/canister/${ecid.toText()}/call" with request:`, transformedRequest);
        return __privateGet(this, _fetch).call(this, "" + new URL(`/api/v2/canister/${ecid.toText()}/call`, this.host), {
          ...__privateGet(this, _callOptions),
          ...transformedRequest.request,
          body
        });
      };
      const requestFn = callSync ? requestSync : requestAsync;
      const { responseBodyBytes, ...response } = await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, {
        requestFn,
        backoff: backoff2,
        tries: 0
      });
      const responseBody = responseBodyBytes.byteLength > 0 ? decode(responseBodyBytes) : null;
      return {
        requestId,
        response: {
          ...response,
          body: responseBody
        },
        requestDetails: submit
      };
    } catch (error) {
      let callError;
      if (error instanceof AgentError) {
        if (error.hasCode(HttpV3ApiNotSupportedErrorCode)) {
          this.log.warn("v3 api not supported. Fall back to v2");
          return this.call(canisterId, {
            ...options,
            // disable v3 api
            callSync: false
          }, identity);
        } else if (error.hasCode(IngressExpiryInvalidErrorCode) && !__privateGet(this, _hasSyncedTime)) {
          await this.syncTime(canister);
          return this.call(canister, options, identity);
        } else {
          error.code.requestContext = {
            requestId,
            senderPubKey: transformedRequest.body.sender_pubkey,
            senderSignature: transformedRequest.body.sender_sig,
            ingressExpiry: transformedRequest.body.content.ingress_expiry
          };
          callError = error;
        }
      } else {
        callError = UnknownError.fromCode(new UnexpectedErrorCode(error));
      }
      this.log.error(`Error while making call: ${callError.message}`, callError);
      throw callError;
    }
  }
  async query(canisterId, fields, identity) {
    const backoff2 = __privateGet(this, _backoffStrategy).call(this);
    const ecid = fields.effectiveCanisterId ? Principal$2.from(fields.effectiveCanisterId) : Principal$2.from(canisterId);
    await __privateMethod(this, _HttpAgent_instances, asyncGuard_fn).call(this, ecid);
    this.log.print(`ecid ${ecid.toString()}`);
    this.log.print(`canisterId ${canisterId.toString()}`);
    let transformedRequest;
    const id = await (identity ?? __privateGet(this, _identity));
    if (!id) {
      throw ExternalError.fromCode(new IdentityInvalidErrorCode());
    }
    const canister = Principal$2.from(canisterId);
    const sender = id.getPrincipal();
    const ingressExpiry = calculateIngressExpiry(__privateGet(this, _maxIngressExpiryInMinutes), __privateGet(this, _timeDiffMsecs));
    const request2 = {
      request_type: ReadRequestType.Query,
      canister_id: canister,
      method_name: fields.methodName,
      arg: fields.arg,
      sender,
      ingress_expiry: ingressExpiry
    };
    const requestId = requestIdOf(request2);
    transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/cbor",
          ...__privateGet(this, _credentials) ? { Authorization: "Basic " + btoa(__privateGet(this, _credentials)) } : {}
        }
      },
      endpoint: Endpoint.Query,
      body: request2
    });
    transformedRequest = await id.transformRequest(transformedRequest);
    const body = encode(transformedRequest.body);
    const args = {
      canister: canister.toText(),
      ecid,
      transformedRequest,
      body,
      requestId,
      backoff: backoff2,
      tries: 0
    };
    const makeQuery = async () => {
      const query = await __privateMethod(this, _HttpAgent_instances, requestAndRetryQuery_fn).call(this, args);
      return {
        requestDetails: request2,
        ...query
      };
    };
    const getSubnetStatus = async () => {
      const cachedSubnetStatus = __privateGet(this, _subnetKeys).get(ecid.toString());
      if (cachedSubnetStatus) {
        return cachedSubnetStatus;
      }
      await this.fetchSubnetKeys(ecid.toString());
      const subnetStatus = __privateGet(this, _subnetKeys).get(ecid.toString());
      if (!subnetStatus) {
        throw TrustError.fromCode(new MissingSignatureErrorCode());
      }
      return subnetStatus;
    };
    try {
      if (!__privateGet(this, _verifyQuerySignatures)) {
        return await makeQuery();
      }
      const [queryWithDetails, subnetStatus] = await Promise.all([makeQuery(), getSubnetStatus()]);
      try {
        return __privateGet(this, _verifyQueryResponse).call(this, queryWithDetails, subnetStatus);
      } catch {
        this.log.warn("Query response verification failed. Retrying with fresh subnet keys.");
        __privateGet(this, _subnetKeys).delete(ecid.toString());
        const updatedSubnetStatus = await getSubnetStatus();
        return __privateGet(this, _verifyQueryResponse).call(this, queryWithDetails, updatedSubnetStatus);
      }
    } catch (error) {
      let queryError;
      if (error instanceof AgentError) {
        error.code.requestContext = {
          requestId,
          senderPubKey: transformedRequest.body.sender_pubkey,
          senderSignature: transformedRequest.body.sender_sig,
          ingressExpiry: transformedRequest.body.content.ingress_expiry
        };
        queryError = error;
      } else {
        queryError = UnknownError.fromCode(new UnexpectedErrorCode(error));
      }
      this.log.error(`Error while making query: ${queryError.message}`, queryError);
      throw queryError;
    }
  }
  async createReadStateRequest(fields, identity) {
    await __privateMethod(this, _HttpAgent_instances, asyncGuard_fn).call(this);
    const id = await (identity ?? __privateGet(this, _identity));
    if (!id) {
      throw ExternalError.fromCode(new IdentityInvalidErrorCode());
    }
    const sender = id.getPrincipal();
    const transformedRequest = await this._transform({
      request: {
        method: "POST",
        headers: {
          "Content-Type": "application/cbor",
          ...__privateGet(this, _credentials) ? { Authorization: "Basic " + btoa(__privateGet(this, _credentials)) } : {}
        }
      },
      endpoint: Endpoint.ReadState,
      body: {
        request_type: ReadRequestType.ReadState,
        paths: fields.paths,
        sender,
        ingress_expiry: calculateIngressExpiry(__privateGet(this, _maxIngressExpiryInMinutes), __privateGet(this, _timeDiffMsecs))
      }
    });
    return id.transformRequest(transformedRequest);
  }
  async readState(canisterId, fields, _identity2, request2) {
    await __privateMethod(this, _HttpAgent_instances, rootKeyGuard_fn).call(this);
    const canister = Principal$2.from(canisterId);
    function getRequestId(options) {
      for (const path of options.paths) {
        const [pathName, value] = path;
        const request_status = new TextEncoder().encode("request_status");
        if (uint8Equals(pathName, request_status)) {
          return value;
        }
      }
    }
    let transformedRequest;
    let requestId;
    if (request2) {
      transformedRequest = request2;
      requestId = requestIdOf(transformedRequest);
    } else {
      requestId = getRequestId(fields);
      const identity = await __privateGet(this, _identity);
      if (!identity) {
        throw ExternalError.fromCode(new IdentityInvalidErrorCode());
      }
      transformedRequest = await this.createReadStateRequest(fields, identity);
    }
    this.log.print(`fetching "/api/v2/canister/${canister}/read_state" with request:`, transformedRequest);
    const backoff2 = __privateGet(this, _backoffStrategy).call(this);
    try {
      const { responseBodyBytes } = await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, {
        requestFn: () => __privateGet(this, _fetch).call(this, "" + new URL(`/api/v2/canister/${canister.toString()}/read_state`, this.host), {
          ...__privateGet(this, _fetchOptions),
          ...transformedRequest.request,
          body: encode(transformedRequest.body)
        }),
        backoff: backoff2,
        tries: 0
      });
      const decodedResponse = decode(responseBodyBytes);
      this.log.print("Read state response:", decodedResponse);
      return decodedResponse;
    } catch (error) {
      let readStateError;
      if (error instanceof AgentError) {
        error.code.requestContext = {
          requestId,
          senderPubKey: transformedRequest.body.sender_pubkey,
          senderSignature: transformedRequest.body.sender_sig,
          ingressExpiry: transformedRequest.body.content.ingress_expiry
        };
        readStateError = error;
      } else {
        readStateError = UnknownError.fromCode(new UnexpectedErrorCode(error));
      }
      this.log.error(`Error while making read state: ${readStateError.message}`, readStateError);
      throw readStateError;
    }
  }
  parseTimeFromResponse(response) {
    let tree;
    if (response.certificate) {
      const decoded = decode(response.certificate);
      if (decoded && "tree" in decoded) {
        tree = decoded.tree;
      } else {
        throw ProtocolError.fromCode(new HashTreeDecodeErrorCode("Could not decode time from response"));
      }
      const timeLookup = lookup_path(["time"], tree);
      if (timeLookup.status !== LookupPathStatus.Found) {
        throw ProtocolError.fromCode(new LookupErrorCode("Time was not found in the response or was not in its expected format.", timeLookup.status));
      }
      if (!(timeLookup.value instanceof Uint8Array) && !ArrayBuffer.isView(timeLookup)) {
        throw ProtocolError.fromCode(new MalformedLookupFoundValueErrorCode("Time was not in its expected format."));
      }
      const date = decodeTime(timeLookup.value);
      this.log.print("Time from response:", date);
      this.log.print("Time from response in milliseconds:", date.getTime());
      return date.getTime();
    } else {
      this.log.warn("No certificate found in response");
    }
    return 0;
  }
  /**
   * Allows agent to sync its time with the network. Can be called during intialization or mid-lifecycle if the device's clock has drifted away from the network time. This is necessary to set the Expiry for a request
   * @param {Principal} canisterIdOverride - Pass a canister ID if you need to sync the time with a particular subnet. Uses the ICP ledger canister by default.
   */
  async syncTime(canisterIdOverride) {
    __privateSet(this, _syncTimePromise, __privateGet(this, _syncTimePromise) ?? (async () => {
      await __privateMethod(this, _HttpAgent_instances, rootKeyGuard_fn).call(this);
      const callTime = Date.now();
      try {
        if (!canisterIdOverride) {
          this.log.print("Syncing time with the IC. No canisterId provided, so falling back to ryjl3-tyaaa-aaaaa-aaaba-cai");
        }
        const canisterId = canisterIdOverride ?? Principal$2.from("ryjl3-tyaaa-aaaaa-aaaba-cai");
        const anonymousAgent = _HttpAgent.createSync({
          identity: new AnonymousIdentity(),
          host: this.host.toString(),
          fetch: __privateGet(this, _fetch),
          retryTimes: 0,
          rootKey: this.rootKey ?? void 0,
          shouldSyncTime: false
        });
        const replicaTimes = await Promise.all(Array(3).fill(null).map(async () => {
          const status = await request({
            canisterId,
            agent: anonymousAgent,
            paths: ["time"],
            disableCertificateTimeVerification: true
            // avoid recursive calls to syncTime
          });
          const date = status.get("time");
          if (date instanceof Date) {
            return date.getTime();
          }
        }, []));
        const maxReplicaTime = replicaTimes.reduce((max, current) => {
          return typeof current === "number" && current > max ? current : max;
        }, 0);
        if (maxReplicaTime > 0) {
          __privateSet(this, _timeDiffMsecs, maxReplicaTime - callTime);
          __privateSet(this, _hasSyncedTime, true);
          this.log.notify({
            message: `Syncing time: offset of ${__privateGet(this, _timeDiffMsecs)}`,
            level: "info"
          });
        }
      } catch (error) {
        const syncTimeError = error instanceof AgentError ? error : UnknownError.fromCode(new UnexpectedErrorCode(error));
        this.log.error("Caught exception while attempting to sync time", syncTimeError);
        throw syncTimeError;
      }
    })());
    await __privateGet(this, _syncTimePromise).finally(() => {
      __privateSet(this, _syncTimePromise, null);
    });
  }
  async status() {
    const headers = __privateGet(this, _credentials) ? {
      Authorization: "Basic " + btoa(__privateGet(this, _credentials))
    } : {};
    this.log.print(`fetching "/api/v2/status"`);
    const backoff2 = __privateGet(this, _backoffStrategy).call(this);
    const { responseBodyBytes } = await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, {
      backoff: backoff2,
      requestFn: () => __privateGet(this, _fetch).call(this, "" + new URL(`/api/v2/status`, this.host), { headers, ...__privateGet(this, _fetchOptions) }),
      tries: 0
    });
    return decode(responseBodyBytes);
  }
  async fetchRootKey() {
    __privateSet(this, _rootKeyPromise, __privateGet(this, _rootKeyPromise) ?? (async () => {
      const value = await this.status();
      this.rootKey = value.root_key;
      return this.rootKey;
    })());
    return await __privateGet(this, _rootKeyPromise).finally(() => {
      __privateSet(this, _rootKeyPromise, null);
    });
  }
  invalidateIdentity() {
    __privateSet(this, _identity, null);
  }
  replaceIdentity(identity) {
    __privateSet(this, _identity, Promise.resolve(identity));
  }
  async fetchSubnetKeys(canisterId) {
    const effectiveCanisterId = Principal$2.from(canisterId);
    await __privateMethod(this, _HttpAgent_instances, asyncGuard_fn).call(this, effectiveCanisterId);
    const response = await request({
      canisterId: effectiveCanisterId,
      paths: ["subnet"],
      agent: this
    });
    const subnetResponse = response.get("subnet");
    if (subnetResponse && typeof subnetResponse === "object" && "nodeKeys" in subnetResponse) {
      __privateGet(this, _subnetKeys).set(effectiveCanisterId.toText(), subnetResponse);
      return subnetResponse;
    }
    return void 0;
  }
  _transform(request2) {
    let p2 = Promise.resolve(request2);
    if (request2.endpoint === Endpoint.Call) {
      for (const fn of __privateGet(this, _updatePipeline)) {
        p2 = p2.then((r2) => fn(r2).then((r22) => r22 || r2));
      }
    } else {
      for (const fn of __privateGet(this, _queryPipeline)) {
        p2 = p2.then((r2) => fn(r2).then((r22) => r22 || r2));
      }
    }
    return p2;
  }
  /**
   * Returns the time difference in milliseconds between the IC network clock and the client's clock,
   * after the clock has been synced.
   *
   * If the time has not been synced, returns `0`.
   */
  getTimeDiffMsecs() {
    return __privateGet(this, _timeDiffMsecs);
  }
  /**
   * Returns `true` if the time has been synced at least once with the IC network, `false` otherwise.
   */
  hasSyncedTime() {
    return __privateGet(this, _hasSyncedTime);
  }
};
_rootKeyPromise = new WeakMap();
_shouldFetchRootKey = new WeakMap();
_timeDiffMsecs = new WeakMap();
_hasSyncedTime = new WeakMap();
_syncTimePromise = new WeakMap();
_shouldSyncTime = new WeakMap();
_identity = new WeakMap();
_fetch = new WeakMap();
_fetchOptions = new WeakMap();
_callOptions = new WeakMap();
_credentials = new WeakMap();
_retryTimes = new WeakMap();
_backoffStrategy = new WeakMap();
_maxIngressExpiryInMinutes = new WeakMap();
_HttpAgent_instances = new WeakSet();
maxIngressExpiryInMs_get = function() {
  return __privateGet(this, _maxIngressExpiryInMinutes) * MINUTE_TO_MSECS;
};
_queryPipeline = new WeakMap();
_updatePipeline = new WeakMap();
_subnetKeys = new WeakMap();
_verifyQuerySignatures = new WeakMap();
requestAndRetryQuery_fn = async function(args) {
  var _a2, _b2;
  const { ecid, transformedRequest, body, requestId, backoff: backoff2, tries } = args;
  const delay = tries === 0 ? 0 : backoff2.next();
  this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with tries:`, {
    tries,
    backoff: backoff2,
    delay
  });
  if (delay === null) {
    throw UnknownError.fromCode(new TimeoutWaitingForResponseErrorCode(`Backoff strategy exhausted after ${tries} attempts.`, requestId));
  }
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  let response;
  try {
    this.log.print(`fetching "/api/v2/canister/${ecid.toString()}/query" with request:`, transformedRequest);
    const fetchResponse = await __privateGet(this, _fetch).call(this, "" + new URL(`/api/v2/canister/${ecid.toString()}/query`, this.host), {
      ...__privateGet(this, _fetchOptions),
      ...transformedRequest.request,
      body
    });
    if (fetchResponse.status === HTTP_STATUS_OK) {
      const queryResponse = decode(uint8FromBufLike(await fetchResponse.arrayBuffer()));
      response = {
        ...queryResponse,
        httpDetails: {
          ok: fetchResponse.ok,
          status: fetchResponse.status,
          statusText: fetchResponse.statusText,
          headers: httpHeadersTransform(fetchResponse.headers)
        },
        requestId
      };
    } else {
      throw ProtocolError.fromCode(new HttpErrorCode(fetchResponse.status, fetchResponse.statusText, httpHeadersTransform(fetchResponse.headers), await fetchResponse.text()));
    }
  } catch (error) {
    if (tries < __privateGet(this, _retryTimes)) {
      this.log.warn(`Caught exception while attempting to make query:
  ${error}
  Retrying query.`);
      return await __privateMethod(this, _HttpAgent_instances, requestAndRetryQuery_fn).call(this, { ...args, tries: tries + 1 });
    }
    if (error instanceof AgentError) {
      throw error;
    }
    throw TransportError.fromCode(new HttpFetchErrorCode(error));
  }
  if (!__privateGet(this, _verifyQuerySignatures)) {
    return response;
  }
  const signatureTimestampNs = (_b2 = (_a2 = response.signatures) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.timestamp;
  if (!signatureTimestampNs) {
    throw ProtocolError.fromCode(new MalformedSignatureErrorCode("Timestamp not found in query response. This suggests a malformed or malicious response."));
  }
  const signatureTimestampMs = Number(BigInt(signatureTimestampNs) / BigInt(MSECS_TO_NANOSECONDS));
  const currentTimestampInMs = Date.now() + __privateGet(this, _timeDiffMsecs);
  if (currentTimestampInMs - signatureTimestampMs > __privateGet(this, _HttpAgent_instances, maxIngressExpiryInMs_get)) {
    if (tries < __privateGet(this, _retryTimes)) {
      this.log.warn("Timestamp is older than the max ingress expiry. Retrying query.", {
        requestId,
        signatureTimestampMs
      });
      return await __privateMethod(this, _HttpAgent_instances, requestAndRetryQuery_fn).call(this, { ...args, tries: tries + 1 });
    }
    throw TrustError.fromCode(new CertificateOutdatedErrorCode(__privateGet(this, _maxIngressExpiryInMinutes), requestId, tries));
  }
  return response;
};
requestAndRetry_fn = async function(args) {
  const { requestFn, backoff: backoff2, tries } = args;
  const delay = tries === 0 ? 0 : backoff2.next();
  if (delay === null) {
    throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Retry strategy exhausted after ${tries} attempts.`));
  }
  if (delay > 0) {
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  let response;
  let responseBodyBytes = new Uint8Array();
  try {
    response = await requestFn();
    if (response.status === HTTP_STATUS_OK) {
      responseBodyBytes = uint8FromBufLike(await response.clone().arrayBuffer());
    }
  } catch (error) {
    if (tries < __privateGet(this, _retryTimes)) {
      this.log.warn(`Caught exception while attempting to make request:
  ${error}
  Retrying request.`);
      return await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, { requestFn, backoff: backoff2, tries: tries + 1 });
    }
    throw TransportError.fromCode(new HttpFetchErrorCode(error));
  }
  const headers = httpHeadersTransform(response.headers);
  if (response.status === HTTP_STATUS_OK || response.status === HTTP_STATUS_ACCEPTED) {
    return {
      ok: response.ok,
      // should always be true
      status: response.status,
      statusText: response.statusText,
      responseBodyBytes,
      headers
    };
  }
  const responseText = await response.text();
  if (response.status === HTTP_STATUS_NOT_FOUND && response.url.includes("api/v3")) {
    throw ProtocolError.fromCode(new HttpV3ApiNotSupportedErrorCode());
  }
  if (responseText.startsWith("Invalid request expiry: ")) {
    throw InputError.fromCode(new IngressExpiryInvalidErrorCode(responseText, __privateGet(this, _maxIngressExpiryInMinutes)));
  }
  if (tries < __privateGet(this, _retryTimes)) {
    return await __privateMethod(this, _HttpAgent_instances, requestAndRetry_fn).call(this, { requestFn, backoff: backoff2, tries: tries + 1 });
  }
  throw ProtocolError.fromCode(new HttpErrorCode(response.status, response.statusText, headers, responseText));
};
_verifyQueryResponse = new WeakMap();
asyncGuard_fn = async function(canisterIdOverride) {
  await Promise.all([__privateMethod(this, _HttpAgent_instances, rootKeyGuard_fn).call(this), __privateMethod(this, _HttpAgent_instances, syncTimeGuard_fn).call(this, canisterIdOverride)]);
};
rootKeyGuard_fn = async function() {
  if (this.rootKey) {
    return;
  } else if (this.rootKey === null && this.host.toString() !== "https://icp-api.io" && __privateGet(this, _shouldFetchRootKey)) {
    await this.fetchRootKey();
  } else {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode(__privateGet(this, _shouldFetchRootKey)));
  }
};
syncTimeGuard_fn = async function(canisterIdOverride) {
  if (__privateGet(this, _shouldSyncTime) && !this.hasSyncedTime()) {
    await this.syncTime(canisterIdOverride);
  }
};
let HttpAgent = _HttpAgent;
function calculateIngressExpiry(maxIngressExpiryInMinutes, timeDiffMsecs) {
  const ingressExpiryMs = maxIngressExpiryInMinutes * MINUTE_TO_MSECS;
  return Expiry.fromDeltaInMilliseconds(ingressExpiryMs, timeDiffMsecs);
}
const FIVE_MINUTES_IN_MSEC = 5 * 60 * 1e3;
function defaultStrategy() {
  return chain(conditionalDelay(once(), 1e3), backoff(1e3, 1.2), timeout(FIVE_MINUTES_IN_MSEC));
}
function once() {
  let first = true;
  return async () => {
    if (first) {
      first = false;
      return true;
    }
    return false;
  };
}
function conditionalDelay(condition, timeInMsec) {
  return async (canisterId, requestId, status) => {
    if (await condition(canisterId, requestId, status)) {
      return new Promise((resolve) => setTimeout(resolve, timeInMsec));
    }
  };
}
function timeout(timeInMsec) {
  const end = Date.now() + timeInMsec;
  return async (_canisterId, requestId, status) => {
    if (Date.now() > end) {
      throw ProtocolError.fromCode(new TimeoutWaitingForResponseErrorCode(`Request timed out after ${timeInMsec} msec`, requestId, status));
    }
  };
}
function backoff(startingThrottleInMsec, backoffFactor) {
  let currentThrottling = startingThrottleInMsec;
  return () => new Promise((resolve) => setTimeout(() => {
    currentThrottling *= backoffFactor;
    resolve();
  }, currentThrottling));
}
function chain(...strategies) {
  return async (canisterId, requestId, status) => {
    for (const a2 of strategies) {
      await a2(canisterId, requestId, status);
    }
  };
}
const DEFAULT_POLLING_OPTIONS = {
  preSignReadStateRequest: false
};
function hasProperty(value, property) {
  return Object.prototype.hasOwnProperty.call(value, property);
}
function isObjectWithProperty(value, property) {
  return value !== null && typeof value === "object" && hasProperty(value, property);
}
function hasFunction(value, property) {
  return hasProperty(value, property) && typeof value[property] === "function";
}
function isSignedReadStateRequestWithExpiry(value) {
  return isObjectWithProperty(value, "body") && isObjectWithProperty(value.body, "content") && value.body.content.request_type === ReadRequestType.ReadState && isObjectWithProperty(value.body.content, "ingress_expiry") && typeof value.body.content.ingress_expiry === "object" && value.body.content.ingress_expiry !== null && hasFunction(value.body.content.ingress_expiry, "toHash");
}
async function pollForResponse(agent, canisterId, requestId, options = {}) {
  const path = [utf8ToBytes("request_status"), requestId];
  let state;
  let currentRequest;
  const preSignReadStateRequest = options.preSignReadStateRequest ?? false;
  if (preSignReadStateRequest) {
    currentRequest = await constructRequest({
      paths: [path],
      agent,
      pollingOptions: options
    });
    state = await agent.readState(canisterId, { paths: [path] }, void 0, currentRequest);
  } else {
    state = await agent.readState(canisterId, { paths: [path] });
  }
  if (agent.rootKey == null) {
    throw ExternalError.fromCode(new MissingRootKeyErrorCode());
  }
  const cert = await Certificate.create({
    certificate: state.certificate,
    rootKey: agent.rootKey,
    canisterId,
    blsVerify: options.blsVerify,
    agent
  });
  const maybeBuf = lookupResultToBuffer(cert.lookup_path([...path, utf8ToBytes("status")]));
  let status;
  if (typeof maybeBuf === "undefined") {
    status = RequestStatusResponseStatus.Unknown;
  } else {
    status = new TextDecoder().decode(maybeBuf);
  }
  switch (status) {
    case RequestStatusResponseStatus.Replied: {
      return {
        reply: lookupResultToBuffer(cert.lookup_path([...path, "reply"])),
        certificate: cert
      };
    }
    case RequestStatusResponseStatus.Received:
    case RequestStatusResponseStatus.Unknown:
    case RequestStatusResponseStatus.Processing: {
      const strategy = options.strategy ?? defaultStrategy();
      await strategy(canisterId, requestId, status);
      return pollForResponse(agent, canisterId, requestId, {
        ...options,
        // Pass over either the strategy already provided or the new one created above
        strategy,
        request: currentRequest
      });
    }
    case RequestStatusResponseStatus.Rejected: {
      const rejectCode = new Uint8Array(lookupResultToBuffer(cert.lookup_path([...path, "reject_code"])))[0];
      const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(cert.lookup_path([...path, "reject_message"])));
      const errorCodeBuf = lookupResultToBuffer(cert.lookup_path([...path, "error_code"]));
      const errorCode = errorCodeBuf ? new TextDecoder().decode(errorCodeBuf) : void 0;
      throw RejectError.fromCode(new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, errorCode));
    }
    case RequestStatusResponseStatus.Done:
      throw UnknownError.fromCode(new RequestStatusDoneNoReplyErrorCode(requestId));
  }
  throw UNREACHABLE_ERROR;
}
async function constructRequest(options) {
  var _a2;
  const { paths, agent, pollingOptions } = options;
  if (pollingOptions.request && isSignedReadStateRequestWithExpiry(pollingOptions.request)) {
    return pollingOptions.request;
  }
  const request2 = await ((_a2 = agent.createReadStateRequest) == null ? void 0 : _a2.call(agent, {
    paths
  }, void 0));
  if (!isSignedReadStateRequestWithExpiry(request2)) {
    throw InputError.fromCode(new InvalidReadStateRequestErrorCode(request2));
  }
  return request2;
}
const metadataSymbol = Symbol.for("ic-agent-metadata");
class Actor {
  /**
   * Get the Agent class this Actor would call, or undefined if the Actor would use
   * the default agent (global.ic.agent).
   * @param actor The actor to get the agent of.
   */
  static agentOf(actor) {
    return actor[metadataSymbol].config.agent;
  }
  /**
   * Get the interface of an actor, in the form of an instance of a Service.
   * @param actor The actor to get the interface of.
   */
  static interfaceOf(actor) {
    return actor[metadataSymbol].service;
  }
  static canisterIdOf(actor) {
    return Principal$2.from(actor[metadataSymbol].config.canisterId);
  }
  static createActorClass(interfaceFactory, options) {
    const service = interfaceFactory({ IDL });
    class CanisterActor extends Actor {
      constructor(config) {
        if (!config.canisterId) {
          throw InputError.fromCode(new MissingCanisterIdErrorCode(config.canisterId));
        }
        const canisterId = typeof config.canisterId === "string" ? Principal$2.fromText(config.canisterId) : config.canisterId;
        super({
          config: {
            ...DEFAULT_ACTOR_CONFIG,
            ...config,
            canisterId
          },
          service
        });
        for (const [methodName, func] of service._fields) {
          if (options == null ? void 0 : options.httpDetails) {
            func.annotations.push(ACTOR_METHOD_WITH_HTTP_DETAILS);
          }
          if (options == null ? void 0 : options.certificate) {
            func.annotations.push(ACTOR_METHOD_WITH_CERTIFICATE);
          }
          this[methodName] = _createActorMethod(this, methodName, func, config.blsVerify);
        }
      }
    }
    return CanisterActor;
  }
  /**
   * Creates an actor with the given interface factory and configuration.
   *
   * The [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package can be used to generate the interface factory for your canister.
   * @param interfaceFactory - the interface factory for the actor, typically generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package
   * @param configuration - the configuration for the actor
   * @returns an actor with the given interface factory and configuration
   * @example
   * Using the interface factory generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { Actor, HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { idlFactory } from './api/declarations/hello-world.did';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = Actor.createActor(idlFactory, {
   *   agent,
   *   canisterId,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   * @example
   * Using the `createActor` wrapper function generated by the [`@icp-sdk/bindgen`](https://js.icp.build/bindgen/) package:
   * ```ts
   * import { HttpAgent } from '@icp-sdk/core/agent';
   * import { Principal } from '@icp-sdk/core/principal';
   * import { createActor } from './api/hello-world';
   *
   * const canisterId = Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai');
   *
   * const agent = await HttpAgent.create({
   *   host: 'https://icp-api.io',
   * });
   *
   * const actor = createActor(canisterId, {
   *   agent,
   * });
   *
   * const response = await actor.greet('world');
   * console.log(response);
   * ```
   */
  static createActor(interfaceFactory, configuration) {
    if (!configuration.canisterId) {
      throw InputError.fromCode(new MissingCanisterIdErrorCode(configuration.canisterId));
    }
    return new (this.createActorClass(interfaceFactory))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @deprecated - use createActor with actorClassOptions instead
   */
  static createActorWithHttpDetails(interfaceFactory, configuration) {
    return new (this.createActorClass(interfaceFactory, { httpDetails: true }))(configuration);
  }
  /**
   * Returns an actor with methods that return the http response details along with the result
   * @param interfaceFactory - the interface factory for the actor
   * @param configuration - the configuration for the actor
   * @param actorClassOptions - options for the actor class extended details to return with the result
   */
  static createActorWithExtendedDetails(interfaceFactory, configuration, actorClassOptions = {
    httpDetails: true,
    certificate: true
  }) {
    return new (this.createActorClass(interfaceFactory, actorClassOptions))(configuration);
  }
  constructor(metadata) {
    this[metadataSymbol] = Object.freeze(metadata);
  }
}
function decodeReturnValue(types, msg) {
  const returnValues = decode$1(types, msg);
  switch (returnValues.length) {
    case 0:
      return void 0;
    case 1:
      return returnValues[0];
    default:
      return returnValues;
  }
}
const DEFAULT_ACTOR_CONFIG = {
  pollingOptions: DEFAULT_POLLING_OPTIONS
};
const ACTOR_METHOD_WITH_HTTP_DETAILS = "http-details";
const ACTOR_METHOD_WITH_CERTIFICATE = "certificate";
function _createActorMethod(actor, methodName, func, blsVerify2) {
  let caller;
  if (func.annotations.includes("query") || func.annotations.includes("composite_query")) {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = {
        ...options,
        ...(_b2 = (_a2 = actor[metadataSymbol].config).queryTransform) == null ? void 0 : _b2.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || new HttpAgent();
      const cid = Principal$2.from(options.canisterId || actor[metadataSymbol].config.canisterId);
      const arg = encode$1(func.argTypes, args);
      const result = await agent.query(cid, {
        methodName,
        arg,
        effectiveCanisterId: options.effectiveCanisterId
      });
      const httpDetails = {
        ...result.httpDetails,
        requestDetails: result.requestDetails
      };
      switch (result.status) {
        case QueryResponseStatus.Rejected: {
          const uncertifiedRejectErrorCode = new UncertifiedRejectErrorCode(result.requestId, result.reject_code, result.reject_message, result.error_code, result.signatures);
          uncertifiedRejectErrorCode.callContext = {
            canisterId: cid,
            methodName,
            httpDetails
          };
          throw RejectError.fromCode(uncertifiedRejectErrorCode);
        }
        case QueryResponseStatus.Replied:
          return func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS) ? {
            httpDetails,
            result: decodeReturnValue(func.retTypes, result.reply.arg)
          } : decodeReturnValue(func.retTypes, result.reply.arg);
      }
    };
  } else {
    caller = async (options, ...args) => {
      var _a2, _b2;
      options = {
        ...options,
        ...(_b2 = (_a2 = actor[metadataSymbol].config).callTransform) == null ? void 0 : _b2.call(_a2, methodName, args, {
          ...actor[metadataSymbol].config,
          ...options
        })
      };
      const agent = options.agent || actor[metadataSymbol].config.agent || HttpAgent.createSync();
      const { canisterId, effectiveCanisterId, pollingOptions } = {
        ...DEFAULT_ACTOR_CONFIG,
        ...actor[metadataSymbol].config,
        ...options
      };
      const cid = Principal$2.from(canisterId);
      const ecid = effectiveCanisterId !== void 0 ? Principal$2.from(effectiveCanisterId) : cid;
      const arg = encode$1(func.argTypes, args);
      const { requestId, response, requestDetails } = await agent.call(cid, {
        methodName,
        arg,
        effectiveCanisterId: ecid,
        nonce: options.nonce
      });
      let reply;
      let certificate;
      if (isV3ResponseBody(response.body)) {
        if (agent.rootKey == null) {
          throw ExternalError.fromCode(new MissingRootKeyErrorCode());
        }
        const cert = response.body.certificate;
        certificate = await Certificate.create({
          certificate: cert,
          rootKey: agent.rootKey,
          canisterId: ecid,
          blsVerify: blsVerify2,
          agent
        });
        const path = [utf8ToBytes("request_status"), requestId];
        const status = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "status"])));
        switch (status) {
          case "replied":
            reply = lookupResultToBuffer(certificate.lookup_path([...path, "reply"]));
            break;
          case "rejected": {
            const rejectCode = new Uint8Array(lookupResultToBuffer(certificate.lookup_path([...path, "reject_code"])))[0];
            const rejectMessage = new TextDecoder().decode(lookupResultToBuffer(certificate.lookup_path([...path, "reject_message"])));
            const error_code_buf = lookupResultToBuffer(certificate.lookup_path([...path, "error_code"]));
            const error_code = error_code_buf ? new TextDecoder().decode(error_code_buf) : void 0;
            const certifiedRejectErrorCode = new CertifiedRejectErrorCode(requestId, rejectCode, rejectMessage, error_code);
            certifiedRejectErrorCode.callContext = {
              canisterId: cid,
              methodName,
              httpDetails: response
            };
            throw RejectError.fromCode(certifiedRejectErrorCode);
          }
        }
      } else if (isV2ResponseBody(response.body)) {
        const { reject_code, reject_message, error_code } = response.body;
        const errorCode = new UncertifiedRejectUpdateErrorCode(requestId, reject_code, reject_message, error_code);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails: response
        };
        throw RejectError.fromCode(errorCode);
      }
      if (response.status === 202) {
        const pollOptions = {
          ...pollingOptions,
          blsVerify: blsVerify2
        };
        const response2 = await pollForResponse(agent, ecid, requestId, pollOptions);
        certificate = response2.certificate;
        reply = response2.reply;
      }
      const shouldIncludeHttpDetails = func.annotations.includes(ACTOR_METHOD_WITH_HTTP_DETAILS);
      const shouldIncludeCertificate = func.annotations.includes(ACTOR_METHOD_WITH_CERTIFICATE);
      const httpDetails = { ...response, requestDetails };
      if (reply !== void 0) {
        if (shouldIncludeHttpDetails && shouldIncludeCertificate) {
          return {
            httpDetails,
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeCertificate) {
          return {
            certificate,
            result: decodeReturnValue(func.retTypes, reply)
          };
        } else if (shouldIncludeHttpDetails) {
          return {
            httpDetails,
            result: decodeReturnValue(func.retTypes, reply)
          };
        }
        return decodeReturnValue(func.retTypes, reply);
      } else {
        const errorCode = new UnexpectedErrorCode(`Call was returned undefined. We cannot determine if the call was successful or not. Return types: [${func.retTypes.map((t) => t.display()).join(",")}].`);
        errorCode.callContext = {
          canisterId: cid,
          methodName,
          httpDetails
        };
        throw UnknownError.fromCode(errorCode);
      }
    };
  }
  const handler = (...args) => caller({}, ...args);
  handler.withOptions = (options) => (...args) => caller(options, ...args);
  return handler;
}
const Hospital = Record({
  "id": Text,
  "area": Text,
  "city": Text,
  "name": Text,
  "createdAt": Int,
  "isActive": Bool,
  "address": Text,
  "contactNumber": Text
});
const TestInput = Record({
  "mrp": Nat,
  "lab_cost": Nat,
  "code": Text,
  "name": Text,
  "sampleType": Text,
  "isActive": Bool,
  "commission_amount": Nat,
  "profit": Nat,
  "price": Nat
});
const TestOutput = Record({
  "id": Text,
  "mrp": Nat,
  "lab_cost": Nat,
  "code": Text,
  "name": Text,
  "sampleType": Text,
  "isActive": Bool,
  "commission_amount": Nat,
  "profit": Nat,
  "price": Nat
});
const TestError = Variant({
  "notFound": Null,
  "duplicateCode": Null
});
const Principal = Principal$1;
const HospitalPhlebotomistAssignment = Record({
  "assignedAt": Int,
  "assignedBy": Principal,
  "isActive": Bool,
  "hospitalId": Text,
  "removedAt": Opt(Int),
  "removalReason": Opt(Text),
  "phlebotomist": Principal
});
const SampleTestItem = Record({
  "testCode": Text,
  "testName": Text,
  "price": Nat,
  "testId": Text
});
const SampleInput = Record({
  "tests": Vec(Opt(SampleTestItem)),
  "deliveryMethod": Opt(Text),
  "hospitalId": Text,
  "totalAmount": Nat,
  "patientName": Text,
  "paymentType": Text,
  "createdByMobile": Text,
  "phone": Text
});
const AppTask = Record({
  "status": Text,
  "patient_name": Text,
  "hospital_id": Text,
  "task_id": Text,
  "created_at": Int,
  "assigned_by": Text,
  "assigned_to_mobile": Text
});
const AppUser = Record({
  "name": Text,
  "createdAt": Int,
  "role": Text,
  "assignedHospitalId": Opt(Text),
  "isActive": Bool,
  "mobile": Text
});
const SampleRecord = Record({
  "status": Text,
  "tests": Vec(SampleTestItem),
  "createdAt": Int,
  "deliveryMethod": Opt(Text),
  "hospitalId": Text,
  "totalAmount": Nat,
  "patientName": Text,
  "paymentType": Text,
  "createdByMobile": Text,
  "phone": Text,
  "sampleId": Text
});
const AppRole = Variant({
  "patient": Null,
  "superAdmin": Null,
  "labAdmin": Null,
  "phlebotomist": Null
});
const UserProfile = Record({
  "appRole": AppRole,
  "area": Opt(Text),
  "name": Text,
  "phone": Text
});
const DashboardMetrics = Record({
  "pendingReports": Nat,
  "revenueToday": Nat,
  "samplesToday": Nat,
  "samplesTotal": Nat,
  "collectionsToday": Nat,
  "activeHospitals": Nat
});
const Settlement = Record({
  "settlementType": Variant({
    "Partial": Null,
    "Settled": Null
  }),
  "hospitalId": Text,
  "notes": Opt(Text),
  "timestamp": Int,
  "amount": Nat
});
const SystemMode = Variant({
  "production": Null,
  "test": Null
});
Service({
  "addHospital": Func(
    [Text, Text, Text, Text, Text],
    [Hospital],
    []
  ),
  "addTest": Func(
    [TestInput],
    [Variant({ "ok": TestOutput, "err": TestError })],
    []
  ),
  "assignPhlebotomistToHospital": Func(
    [Text, Principal],
    [HospitalPhlebotomistAssignment],
    []
  ),
  "bulkAddTests": Func([Vec(TestInput)], [Vec(TestOutput)], []),
  "claimSuperAdmin": Func(
    [],
    [Variant({ "ok": Text, "err": Text })],
    []
  ),
  "createSample": Func([SampleInput], [Text], []),
  "createTask": Func(
    [Text, Text, Text, Text, Text],
    [AppTask],
    []
  ),
  "deleteAllData": Func([], [], []),
  "deleteAllSampleData": Func([], [Nat], []),
  "deleteAllTasks": Func([], [Nat], []),
  "deleteTestUser": Func([Text], [Bool], []),
  "disableHospital": Func([Text], [Hospital], []),
  "disableTest": Func([Text], [TestOutput], []),
  "getAllAppUsers": Func([], [Vec(AppUser)], ["query"]),
  "getAllSamples": Func([], [Vec(SampleRecord)], ["query"]),
  "getAllTasks": Func([], [Vec(AppTask)], ["query"]),
  "getAllTests": Func([], [Vec(TestOutput)], ["query"]),
  "getCallerUserProfile": Func([], [Opt(UserProfile)], ["query"]),
  "getDashboardMetrics": Func([], [DashboardMetrics], ["query"]),
  "getHospitalById": Func([Text], [Hospital], ["query"]),
  "getHospitals": Func(
    [Opt(Text)],
    [Vec(Hospital)],
    ["query"]
  ),
  "getHospitalsByPhlebotomist": Func(
    [Principal],
    [Vec(Text)],
    ["query"]
  ),
  "getPhlebotomistsByHospital": Func(
    [Text],
    [Vec(Principal)],
    ["query"]
  ),
  "getSamplesByHospital": Func(
    [Text],
    [Vec(SampleRecord)],
    ["query"]
  ),
  "getSamplesByMobile": Func(
    [Text],
    [Vec(SampleRecord)],
    ["query"]
  ),
  "getSettlementHistory": Func(
    [Text],
    [Vec(Settlement)],
    ["query"]
  ),
  "getSystemMode": Func([], [SystemMode], ["query"]),
  "getTasksByUser": Func([Text], [Vec(AppTask)], ["query"]),
  "getTest": Func([Text], [Opt(TestOutput)], ["query"]),
  "getTestByCode": Func([Text], [Opt(TestOutput)], ["query"]),
  "getUserByMobile": Func([Text], [Opt(AppUser)], ["query"]),
  "getUserProfile": Func([Principal], [Opt(UserProfile)], ["query"]),
  "markSettlement": Func(
    [
      Text,
      Nat,
      Variant({ "Partial": Null, "Settled": Null }),
      Opt(Text)
    ],
    [Settlement],
    []
  ),
  "registerAppUser": Func(
    [Text, Text, Text, Opt(Text)],
    [AppUser],
    []
  ),
  "removePhlebotomistFromHospital": Func(
    [Text, Principal, Text],
    [HospitalPhlebotomistAssignment],
    []
  ),
  "saveCallerUserProfile": Func([UserProfile], [], []),
  "seedTestUsers": Func([], [Nat], []),
  "setSystemMode": Func([SystemMode], [], []),
  "setTestStatus": Func(
    [Text, Bool],
    [Variant({ "ok": TestOutput, "err": TestError })],
    []
  ),
  "updateHospital": Func(
    [Text, Text, Text, Text, Text, Text],
    [Hospital],
    []
  ),
  "updateSampleStatus": Func(
    [Text, Text],
    [Variant({ "ok": Null, "notFound": Null })],
    []
  ),
  "updateTest": Func(
    [Text, TestInput],
    [Variant({ "ok": TestOutput, "err": TestError })],
    []
  )
});
const idlFactory = ({ IDL: IDL2 }) => {
  const Hospital2 = IDL2.Record({
    "id": IDL2.Text,
    "area": IDL2.Text,
    "city": IDL2.Text,
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "isActive": IDL2.Bool,
    "address": IDL2.Text,
    "contactNumber": IDL2.Text
  });
  const TestInput2 = IDL2.Record({
    "mrp": IDL2.Nat,
    "lab_cost": IDL2.Nat,
    "code": IDL2.Text,
    "name": IDL2.Text,
    "sampleType": IDL2.Text,
    "isActive": IDL2.Bool,
    "commission_amount": IDL2.Nat,
    "profit": IDL2.Nat,
    "price": IDL2.Nat
  });
  const TestOutput2 = IDL2.Record({
    "id": IDL2.Text,
    "mrp": IDL2.Nat,
    "lab_cost": IDL2.Nat,
    "code": IDL2.Text,
    "name": IDL2.Text,
    "sampleType": IDL2.Text,
    "isActive": IDL2.Bool,
    "commission_amount": IDL2.Nat,
    "profit": IDL2.Nat,
    "price": IDL2.Nat
  });
  const TestError2 = IDL2.Variant({
    "notFound": IDL2.Null,
    "duplicateCode": IDL2.Null
  });
  const Principal2 = IDL2.Principal;
  const HospitalPhlebotomistAssignment2 = IDL2.Record({
    "assignedAt": IDL2.Int,
    "assignedBy": Principal2,
    "isActive": IDL2.Bool,
    "hospitalId": IDL2.Text,
    "removedAt": IDL2.Opt(IDL2.Int),
    "removalReason": IDL2.Opt(IDL2.Text),
    "phlebotomist": Principal2
  });
  const SampleTestItem2 = IDL2.Record({
    "testCode": IDL2.Text,
    "testName": IDL2.Text,
    "price": IDL2.Nat,
    "testId": IDL2.Text
  });
  const SampleInput2 = IDL2.Record({
    "tests": IDL2.Vec(IDL2.Opt(SampleTestItem2)),
    "deliveryMethod": IDL2.Opt(IDL2.Text),
    "hospitalId": IDL2.Text,
    "totalAmount": IDL2.Nat,
    "patientName": IDL2.Text,
    "paymentType": IDL2.Text,
    "createdByMobile": IDL2.Text,
    "phone": IDL2.Text
  });
  const AppTask2 = IDL2.Record({
    "status": IDL2.Text,
    "patient_name": IDL2.Text,
    "hospital_id": IDL2.Text,
    "task_id": IDL2.Text,
    "created_at": IDL2.Int,
    "assigned_by": IDL2.Text,
    "assigned_to_mobile": IDL2.Text
  });
  const AppUser2 = IDL2.Record({
    "name": IDL2.Text,
    "createdAt": IDL2.Int,
    "role": IDL2.Text,
    "assignedHospitalId": IDL2.Opt(IDL2.Text),
    "isActive": IDL2.Bool,
    "mobile": IDL2.Text
  });
  const SampleRecord2 = IDL2.Record({
    "status": IDL2.Text,
    "tests": IDL2.Vec(SampleTestItem2),
    "createdAt": IDL2.Int,
    "deliveryMethod": IDL2.Opt(IDL2.Text),
    "hospitalId": IDL2.Text,
    "totalAmount": IDL2.Nat,
    "patientName": IDL2.Text,
    "paymentType": IDL2.Text,
    "createdByMobile": IDL2.Text,
    "phone": IDL2.Text,
    "sampleId": IDL2.Text
  });
  const AppRole2 = IDL2.Variant({
    "patient": IDL2.Null,
    "superAdmin": IDL2.Null,
    "labAdmin": IDL2.Null,
    "phlebotomist": IDL2.Null
  });
  const UserProfile2 = IDL2.Record({
    "appRole": AppRole2,
    "area": IDL2.Opt(IDL2.Text),
    "name": IDL2.Text,
    "phone": IDL2.Text
  });
  const DashboardMetrics2 = IDL2.Record({
    "pendingReports": IDL2.Nat,
    "revenueToday": IDL2.Nat,
    "samplesToday": IDL2.Nat,
    "samplesTotal": IDL2.Nat,
    "collectionsToday": IDL2.Nat,
    "activeHospitals": IDL2.Nat
  });
  const Settlement2 = IDL2.Record({
    "settlementType": IDL2.Variant({
      "Partial": IDL2.Null,
      "Settled": IDL2.Null
    }),
    "hospitalId": IDL2.Text,
    "notes": IDL2.Opt(IDL2.Text),
    "timestamp": IDL2.Int,
    "amount": IDL2.Nat
  });
  const SystemMode2 = IDL2.Variant({
    "production": IDL2.Null,
    "test": IDL2.Null
  });
  return IDL2.Service({
    "addHospital": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text],
      [Hospital2],
      []
    ),
    "addTest": IDL2.Func(
      [TestInput2],
      [IDL2.Variant({ "ok": TestOutput2, "err": TestError2 })],
      []
    ),
    "assignPhlebotomistToHospital": IDL2.Func(
      [IDL2.Text, Principal2],
      [HospitalPhlebotomistAssignment2],
      []
    ),
    "bulkAddTests": IDL2.Func([IDL2.Vec(TestInput2)], [IDL2.Vec(TestOutput2)], []),
    "claimSuperAdmin": IDL2.Func(
      [],
      [IDL2.Variant({ "ok": IDL2.Text, "err": IDL2.Text })],
      []
    ),
    "createSample": IDL2.Func([SampleInput2], [IDL2.Text], []),
    "createTask": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text],
      [AppTask2],
      []
    ),
    "deleteAllData": IDL2.Func([], [], []),
    "deleteAllSampleData": IDL2.Func([], [IDL2.Nat], []),
    "deleteAllTasks": IDL2.Func([], [IDL2.Nat], []),
    "deleteTestUser": IDL2.Func([IDL2.Text], [IDL2.Bool], []),
    "disableHospital": IDL2.Func([IDL2.Text], [Hospital2], []),
    "disableTest": IDL2.Func([IDL2.Text], [TestOutput2], []),
    "getAllAppUsers": IDL2.Func([], [IDL2.Vec(AppUser2)], ["query"]),
    "getAllSamples": IDL2.Func([], [IDL2.Vec(SampleRecord2)], ["query"]),
    "getAllTasks": IDL2.Func([], [IDL2.Vec(AppTask2)], ["query"]),
    "getAllTests": IDL2.Func([], [IDL2.Vec(TestOutput2)], ["query"]),
    "getCallerUserProfile": IDL2.Func([], [IDL2.Opt(UserProfile2)], ["query"]),
    "getDashboardMetrics": IDL2.Func([], [DashboardMetrics2], ["query"]),
    "getHospitalById": IDL2.Func([IDL2.Text], [Hospital2], ["query"]),
    "getHospitals": IDL2.Func(
      [IDL2.Opt(IDL2.Text)],
      [IDL2.Vec(Hospital2)],
      ["query"]
    ),
    "getHospitalsByPhlebotomist": IDL2.Func(
      [Principal2],
      [IDL2.Vec(IDL2.Text)],
      ["query"]
    ),
    "getPhlebotomistsByHospital": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(Principal2)],
      ["query"]
    ),
    "getSamplesByHospital": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(SampleRecord2)],
      ["query"]
    ),
    "getSamplesByMobile": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(SampleRecord2)],
      ["query"]
    ),
    "getSettlementHistory": IDL2.Func(
      [IDL2.Text],
      [IDL2.Vec(Settlement2)],
      ["query"]
    ),
    "getSystemMode": IDL2.Func([], [SystemMode2], ["query"]),
    "getTasksByUser": IDL2.Func([IDL2.Text], [IDL2.Vec(AppTask2)], ["query"]),
    "getTest": IDL2.Func([IDL2.Text], [IDL2.Opt(TestOutput2)], ["query"]),
    "getTestByCode": IDL2.Func([IDL2.Text], [IDL2.Opt(TestOutput2)], ["query"]),
    "getUserByMobile": IDL2.Func([IDL2.Text], [IDL2.Opt(AppUser2)], ["query"]),
    "getUserProfile": IDL2.Func([Principal2], [IDL2.Opt(UserProfile2)], ["query"]),
    "markSettlement": IDL2.Func(
      [
        IDL2.Text,
        IDL2.Nat,
        IDL2.Variant({ "Partial": IDL2.Null, "Settled": IDL2.Null }),
        IDL2.Opt(IDL2.Text)
      ],
      [Settlement2],
      []
    ),
    "registerAppUser": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Opt(IDL2.Text)],
      [AppUser2],
      []
    ),
    "removePhlebotomistFromHospital": IDL2.Func(
      [IDL2.Text, Principal2, IDL2.Text],
      [HospitalPhlebotomistAssignment2],
      []
    ),
    "saveCallerUserProfile": IDL2.Func([UserProfile2], [], []),
    "seedTestUsers": IDL2.Func([], [IDL2.Nat], []),
    "setSystemMode": IDL2.Func([SystemMode2], [], []),
    "setTestStatus": IDL2.Func(
      [IDL2.Text, IDL2.Bool],
      [IDL2.Variant({ "ok": TestOutput2, "err": TestError2 })],
      []
    ),
    "updateHospital": IDL2.Func(
      [IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text, IDL2.Text],
      [Hospital2],
      []
    ),
    "updateSampleStatus": IDL2.Func(
      [IDL2.Text, IDL2.Text],
      [IDL2.Variant({ "ok": IDL2.Null, "notFound": IDL2.Null })],
      []
    ),
    "updateTest": IDL2.Func(
      [IDL2.Text, TestInput2],
      [IDL2.Variant({ "ok": TestOutput2, "err": TestError2 })],
      []
    )
  });
};
function candid_some(value) {
  return [
    value
  ];
}
function candid_none() {
  return [];
}
function record_opt_to_undefined(arg) {
  return arg == null ? void 0 : arg;
}
var Variant_Partial_Settled = /* @__PURE__ */ ((Variant_Partial_Settled2) => {
  Variant_Partial_Settled2["Partial_"] = "Partial";
  Variant_Partial_Settled2["Settled"] = "Settled";
  return Variant_Partial_Settled2;
})(Variant_Partial_Settled || {});
class Backend {
  constructor(actor, _uploadFile, _downloadFile, processError) {
    this.actor = actor;
    this._uploadFile = _uploadFile;
    this._downloadFile = _downloadFile;
    this.processError = processError;
  }
  async addHospital(arg0, arg1, arg2, arg3, arg4) {
    if (this.processError) {
      try {
        const result = await this.actor.addHospital(arg0, arg1, arg2, arg3, arg4);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addHospital(arg0, arg1, arg2, arg3, arg4);
      return result;
    }
  }
  async addTest(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.addTest(arg0);
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.addTest(arg0);
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async assignPhlebotomistToHospital(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.assignPhlebotomistToHospital(arg0, arg1);
        return from_candid_HospitalPhlebotomistAssignment_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.assignPhlebotomistToHospital(arg0, arg1);
      return from_candid_HospitalPhlebotomistAssignment_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async bulkAddTests(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.bulkAddTests(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.bulkAddTests(arg0);
      return result;
    }
  }
  async claimSuperAdmin() {
    if (this.processError) {
      try {
        const result = await this.actor.claimSuperAdmin();
        return from_candid_variant_n8(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.claimSuperAdmin();
      return from_candid_variant_n8(this._uploadFile, this._downloadFile, result);
    }
  }
  async createSample(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.createSample(to_candid_SampleInput_n9(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createSample(to_candid_SampleInput_n9(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async createTask(arg0, arg1, arg2, arg3, arg4) {
    if (this.processError) {
      try {
        const result = await this.actor.createTask(arg0, arg1, arg2, arg3, arg4);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.createTask(arg0, arg1, arg2, arg3, arg4);
      return result;
    }
  }
  async deleteAllData() {
    if (this.processError) {
      try {
        const result = await this.actor.deleteAllData();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteAllData();
      return result;
    }
  }
  async deleteAllSampleData() {
    if (this.processError) {
      try {
        const result = await this.actor.deleteAllSampleData();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteAllSampleData();
      return result;
    }
  }
  async deleteAllTasks() {
    if (this.processError) {
      try {
        const result = await this.actor.deleteAllTasks();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteAllTasks();
      return result;
    }
  }
  async deleteTestUser(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.deleteTestUser(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.deleteTestUser(arg0);
      return result;
    }
  }
  async disableHospital(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.disableHospital(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.disableHospital(arg0);
      return result;
    }
  }
  async disableTest(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.disableTest(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.disableTest(arg0);
      return result;
    }
  }
  async getAllAppUsers() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllAppUsers();
        return from_candid_vec_n13(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllAppUsers();
      return from_candid_vec_n13(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllSamples() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllSamples();
        return from_candid_vec_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllSamples();
      return from_candid_vec_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async getAllTasks() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllTasks();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllTasks();
      return result;
    }
  }
  async getAllTests() {
    if (this.processError) {
      try {
        const result = await this.actor.getAllTests();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getAllTests();
      return result;
    }
  }
  async getCallerUserProfile() {
    if (this.processError) {
      try {
        const result = await this.actor.getCallerUserProfile();
        return from_candid_opt_n19(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getCallerUserProfile();
      return from_candid_opt_n19(this._uploadFile, this._downloadFile, result);
    }
  }
  async getDashboardMetrics() {
    if (this.processError) {
      try {
        const result = await this.actor.getDashboardMetrics();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getDashboardMetrics();
      return result;
    }
  }
  async getHospitalById(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getHospitalById(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getHospitalById(arg0);
      return result;
    }
  }
  async getHospitals(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getHospitals(to_candid_opt_n24(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getHospitals(to_candid_opt_n24(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async getHospitalsByPhlebotomist(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getHospitalsByPhlebotomist(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getHospitalsByPhlebotomist(arg0);
      return result;
    }
  }
  async getPhlebotomistsByHospital(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getPhlebotomistsByHospital(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getPhlebotomistsByHospital(arg0);
      return result;
    }
  }
  async getSamplesByHospital(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSamplesByHospital(arg0);
        return from_candid_vec_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSamplesByHospital(arg0);
      return from_candid_vec_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSamplesByMobile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSamplesByMobile(arg0);
        return from_candid_vec_n16(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSamplesByMobile(arg0);
      return from_candid_vec_n16(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSettlementHistory(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getSettlementHistory(arg0);
        return from_candid_vec_n25(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSettlementHistory(arg0);
      return from_candid_vec_n25(this._uploadFile, this._downloadFile, result);
    }
  }
  async getSystemMode() {
    if (this.processError) {
      try {
        const result = await this.actor.getSystemMode();
        return from_candid_SystemMode_n29(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getSystemMode();
      return from_candid_SystemMode_n29(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTasksByUser(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTasksByUser(arg0);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTasksByUser(arg0);
      return result;
    }
  }
  async getTest(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTest(arg0);
        return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTest(arg0);
      return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
    }
  }
  async getTestByCode(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getTestByCode(arg0);
        return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getTestByCode(arg0);
      return from_candid_opt_n31(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserByMobile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUserByMobile(arg0);
        return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserByMobile(arg0);
      return from_candid_opt_n32(this._uploadFile, this._downloadFile, result);
    }
  }
  async getUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.getUserProfile(arg0);
        return from_candid_opt_n19(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.getUserProfile(arg0);
      return from_candid_opt_n19(this._uploadFile, this._downloadFile, result);
    }
  }
  async markSettlement(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.markSettlement(arg0, arg1, to_candid_variant_n33(this._uploadFile, this._downloadFile, arg2), to_candid_opt_n24(this._uploadFile, this._downloadFile, arg3));
        return from_candid_Settlement_n26(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.markSettlement(arg0, arg1, to_candid_variant_n33(this._uploadFile, this._downloadFile, arg2), to_candid_opt_n24(this._uploadFile, this._downloadFile, arg3));
      return from_candid_Settlement_n26(this._uploadFile, this._downloadFile, result);
    }
  }
  async registerAppUser(arg0, arg1, arg2, arg3) {
    if (this.processError) {
      try {
        const result = await this.actor.registerAppUser(arg0, arg1, arg2, to_candid_opt_n24(this._uploadFile, this._downloadFile, arg3));
        return from_candid_AppUser_n14(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.registerAppUser(arg0, arg1, arg2, to_candid_opt_n24(this._uploadFile, this._downloadFile, arg3));
      return from_candid_AppUser_n14(this._uploadFile, this._downloadFile, result);
    }
  }
  async removePhlebotomistFromHospital(arg0, arg1, arg2) {
    if (this.processError) {
      try {
        const result = await this.actor.removePhlebotomistFromHospital(arg0, arg1, arg2);
        return from_candid_HospitalPhlebotomistAssignment_n4(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.removePhlebotomistFromHospital(arg0, arg1, arg2);
      return from_candid_HospitalPhlebotomistAssignment_n4(this._uploadFile, this._downloadFile, result);
    }
  }
  async saveCallerUserProfile(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.saveCallerUserProfile(to_candid_UserProfile_n34(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.saveCallerUserProfile(to_candid_UserProfile_n34(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async seedTestUsers() {
    if (this.processError) {
      try {
        const result = await this.actor.seedTestUsers();
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.seedTestUsers();
      return result;
    }
  }
  async setSystemMode(arg0) {
    if (this.processError) {
      try {
        const result = await this.actor.setSystemMode(to_candid_SystemMode_n38(this._uploadFile, this._downloadFile, arg0));
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setSystemMode(to_candid_SystemMode_n38(this._uploadFile, this._downloadFile, arg0));
      return result;
    }
  }
  async setTestStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.setTestStatus(arg0, arg1);
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.setTestStatus(arg0, arg1);
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateHospital(arg0, arg1, arg2, arg3, arg4, arg5) {
    if (this.processError) {
      try {
        const result = await this.actor.updateHospital(arg0, arg1, arg2, arg3, arg4, arg5);
        return result;
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateHospital(arg0, arg1, arg2, arg3, arg4, arg5);
      return result;
    }
  }
  async updateSampleStatus(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateSampleStatus(arg0, arg1);
        return from_candid_variant_n40(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateSampleStatus(arg0, arg1);
      return from_candid_variant_n40(this._uploadFile, this._downloadFile, result);
    }
  }
  async updateTest(arg0, arg1) {
    if (this.processError) {
      try {
        const result = await this.actor.updateTest(arg0, arg1);
        return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
      } catch (e) {
        this.processError(e);
        throw new Error("unreachable");
      }
    } else {
      const result = await this.actor.updateTest(arg0, arg1);
      return from_candid_variant_n1(this._uploadFile, this._downloadFile, result);
    }
  }
}
function from_candid_AppRole_n22(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n23(_uploadFile, _downloadFile, value);
}
function from_candid_AppUser_n14(_uploadFile, _downloadFile, value) {
  return from_candid_record_n15(_uploadFile, _downloadFile, value);
}
function from_candid_HospitalPhlebotomistAssignment_n4(_uploadFile, _downloadFile, value) {
  return from_candid_record_n5(_uploadFile, _downloadFile, value);
}
function from_candid_SampleRecord_n17(_uploadFile, _downloadFile, value) {
  return from_candid_record_n18(_uploadFile, _downloadFile, value);
}
function from_candid_Settlement_n26(_uploadFile, _downloadFile, value) {
  return from_candid_record_n27(_uploadFile, _downloadFile, value);
}
function from_candid_SystemMode_n29(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n30(_uploadFile, _downloadFile, value);
}
function from_candid_TestError_n2(_uploadFile, _downloadFile, value) {
  return from_candid_variant_n3(_uploadFile, _downloadFile, value);
}
function from_candid_UserProfile_n20(_uploadFile, _downloadFile, value) {
  return from_candid_record_n21(_uploadFile, _downloadFile, value);
}
function from_candid_opt_n19(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_UserProfile_n20(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n31(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n32(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : from_candid_AppUser_n14(_uploadFile, _downloadFile, value[0]);
}
function from_candid_opt_n6(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_opt_n7(_uploadFile, _downloadFile, value) {
  return value.length === 0 ? null : value[0];
}
function from_candid_record_n15(_uploadFile, _downloadFile, value) {
  return {
    name: value.name,
    createdAt: value.createdAt,
    role: value.role,
    assignedHospitalId: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.assignedHospitalId)),
    isActive: value.isActive,
    mobile: value.mobile
  };
}
function from_candid_record_n18(_uploadFile, _downloadFile, value) {
  return {
    status: value.status,
    tests: value.tests,
    createdAt: value.createdAt,
    deliveryMethod: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.deliveryMethod)),
    hospitalId: value.hospitalId,
    totalAmount: value.totalAmount,
    patientName: value.patientName,
    paymentType: value.paymentType,
    createdByMobile: value.createdByMobile,
    phone: value.phone,
    sampleId: value.sampleId
  };
}
function from_candid_record_n21(_uploadFile, _downloadFile, value) {
  return {
    appRole: from_candid_AppRole_n22(_uploadFile, _downloadFile, value.appRole),
    area: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.area)),
    name: value.name,
    phone: value.phone
  };
}
function from_candid_record_n27(_uploadFile, _downloadFile, value) {
  return {
    settlementType: from_candid_variant_n28(_uploadFile, _downloadFile, value.settlementType),
    hospitalId: value.hospitalId,
    notes: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.notes)),
    timestamp: value.timestamp,
    amount: value.amount
  };
}
function from_candid_record_n5(_uploadFile, _downloadFile, value) {
  return {
    assignedAt: value.assignedAt,
    assignedBy: value.assignedBy,
    isActive: value.isActive,
    hospitalId: value.hospitalId,
    removedAt: record_opt_to_undefined(from_candid_opt_n6(_uploadFile, _downloadFile, value.removedAt)),
    removalReason: record_opt_to_undefined(from_candid_opt_n7(_uploadFile, _downloadFile, value.removalReason)),
    phlebotomist: value.phlebotomist
  };
}
function from_candid_variant_n1(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: from_candid_TestError_n2(_uploadFile, _downloadFile, value.err)
  } : value;
}
function from_candid_variant_n23(_uploadFile, _downloadFile, value) {
  return "patient" in value ? "patient" : "superAdmin" in value ? "superAdmin" : "labAdmin" in value ? "labAdmin" : "phlebotomist" in value ? "phlebotomist" : value;
}
function from_candid_variant_n28(_uploadFile, _downloadFile, value) {
  return "Partial" in value ? Variant_Partial_Settled.Partial : "Settled" in value ? "Settled" : value;
}
function from_candid_variant_n3(_uploadFile, _downloadFile, value) {
  return "notFound" in value ? "notFound" : "duplicateCode" in value ? "duplicateCode" : value;
}
function from_candid_variant_n30(_uploadFile, _downloadFile, value) {
  return "production" in value ? "production" : "test" in value ? "test" : value;
}
function from_candid_variant_n40(_uploadFile, _downloadFile, value) {
  return "ok" in value ? "ok" : "notFound" in value ? "notFound" : value;
}
function from_candid_variant_n8(_uploadFile, _downloadFile, value) {
  return "ok" in value ? {
    __kind__: "ok",
    ok: value.ok
  } : "err" in value ? {
    __kind__: "err",
    err: value.err
  } : value;
}
function from_candid_vec_n13(_uploadFile, _downloadFile, value) {
  return value.map((x2) => from_candid_AppUser_n14(_uploadFile, _downloadFile, x2));
}
function from_candid_vec_n16(_uploadFile, _downloadFile, value) {
  return value.map((x2) => from_candid_SampleRecord_n17(_uploadFile, _downloadFile, x2));
}
function from_candid_vec_n25(_uploadFile, _downloadFile, value) {
  return value.map((x2) => from_candid_Settlement_n26(_uploadFile, _downloadFile, x2));
}
function to_candid_AppRole_n36(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n37(_uploadFile, _downloadFile, value);
}
function to_candid_SampleInput_n9(_uploadFile, _downloadFile, value) {
  return to_candid_record_n10(_uploadFile, _downloadFile, value);
}
function to_candid_SystemMode_n38(_uploadFile, _downloadFile, value) {
  return to_candid_variant_n39(_uploadFile, _downloadFile, value);
}
function to_candid_UserProfile_n34(_uploadFile, _downloadFile, value) {
  return to_candid_record_n35(_uploadFile, _downloadFile, value);
}
function to_candid_opt_n12(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_opt_n24(_uploadFile, _downloadFile, value) {
  return value === null ? candid_none() : candid_some(value);
}
function to_candid_record_n10(_uploadFile, _downloadFile, value) {
  return {
    tests: to_candid_vec_n11(_uploadFile, _downloadFile, value.tests),
    deliveryMethod: value.deliveryMethod ? candid_some(value.deliveryMethod) : candid_none(),
    hospitalId: value.hospitalId,
    totalAmount: value.totalAmount,
    patientName: value.patientName,
    paymentType: value.paymentType,
    createdByMobile: value.createdByMobile,
    phone: value.phone
  };
}
function to_candid_record_n35(_uploadFile, _downloadFile, value) {
  return {
    appRole: to_candid_AppRole_n36(_uploadFile, _downloadFile, value.appRole),
    area: value.area ? candid_some(value.area) : candid_none(),
    name: value.name,
    phone: value.phone
  };
}
function to_candid_variant_n33(_uploadFile, _downloadFile, value) {
  return value == Variant_Partial_Settled.Partial ? {
    Partial_: null
  } : value == "Settled" ? {
    Settled: null
  } : value;
}
function to_candid_variant_n37(_uploadFile, _downloadFile, value) {
  return value == "patient" ? {
    patient: null
  } : value == "superAdmin" ? {
    superAdmin: null
  } : value == "labAdmin" ? {
    labAdmin: null
  } : value == "phlebotomist" ? {
    phlebotomist: null
  } : value;
}
function to_candid_variant_n39(_uploadFile, _downloadFile, value) {
  return value == "production" ? {
    production: null
  } : value == "test" ? {
    test: null
  } : value;
}
function to_candid_vec_n11(_uploadFile, _downloadFile, value) {
  return value.map((x2) => to_candid_opt_n12(_uploadFile, _downloadFile, x2));
}
function createActor(canisterId, _uploadFile, _downloadFile, options = {}) {
  const agent = options.agent || HttpAgent.createSync({
    ...options.agentOptions
  });
  if (options.agent && options.agentOptions) {
    console.warn("Detected both agent and agentOptions passed to createActor. Ignoring agentOptions and proceeding with the provided agent.");
  }
  const actor = Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options.actorOptions
  });
  return new Backend(actor, _uploadFile, _downloadFile, options.processError);
}
var define_process_env_default = {};
let configCache = null;
async function loadConfig() {
  if (configCache) {
    return configCache;
  }
  const backendCanisterId = define_process_env_default.CANISTER_ID_BACKEND;
  const envBaseUrl = define_process_env_default.BASE_URL || "/";
  const baseUrl = envBaseUrl.endsWith("/") ? envBaseUrl : `${envBaseUrl}/`;
  try {
    const response = await fetch(`${baseUrl}env.json`);
    const config = await response.json();
    if (!backendCanisterId && config.backend_canister_id === "undefined") {
      console.error("CANISTER_ID_BACKEND is not set");
      throw new Error("CANISTER_ID_BACKEND is not set");
    }
    const canisterId = config.backend_canister_id === "undefined" ? backendCanisterId : config.backend_canister_id;
    console.log("CANISTER ID:", canisterId);
    const fullConfig = {
      backend_host: config.backend_host === "undefined" ? void 0 : config.backend_host,
      backend_canister_id: canisterId,
      project_id: config.project_id !== "undefined" ? config.project_id : "0000000-0000-0000-0000-00000000000",
      ii_derivation_origin: config.ii_derivation_origin === "undefined" ? void 0 : config.ii_derivation_origin
    };
    configCache = fullConfig;
    return fullConfig;
  } catch (e) {
    if (!backendCanisterId) {
      console.error("CANISTER_ID_BACKEND is not set");
      throw new Error("CANISTER_ID_BACKEND is not set");
    }
    const fallbackConfig = {
      backend_host: void 0,
      backend_canister_id: backendCanisterId,
      project_id: "0000000-0000-0000-0000-00000000000",
      ii_derivation_origin: void 0
    };
    console.log("CANISTER ID (fallback):", backendCanisterId);
    configCache = fallbackConfig;
    return fallbackConfig;
  }
}
let actorInstance = null;
async function getActor() {
  var _a2;
  if (actorInstance) return actorInstance;
  const config = await loadConfig();
  const agent = new HttpAgent({
    host: config.backend_host ?? "https://ic0.app"
  });
  if ((_a2 = config.backend_host) == null ? void 0 : _a2.includes("localhost")) {
    await agent.fetchRootKey().catch((err) => {
      console.warn("Unable to fetch root key:", err);
    });
  }
  const _uploadFile = async (_file) => {
    throw new Error("File upload not supported");
  };
  const _downloadFile = async (_bytes) => {
    throw new Error("File download not supported");
  };
  actorInstance = createActor(
    config.backend_canister_id,
    _uploadFile,
    _downloadFile,
    { agent }
  );
  console.log(
    "[backendService] Anonymous actor created for canister:",
    config.backend_canister_id
  );
  return actorInstance;
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
async function getUserByMobile(mobile) {
  try {
    const actor = await getActor();
    const result = await actor.getUserByMobile(mobile);
    if (Array.isArray(result)) {
      return result.length > 0 ? result[0] : null;
    }
    const r2 = result;
    if (r2 && typeof r2 === "object" && "ok" in r2)
      return r2.ok;
    if (r2 && typeof r2 === "object" && "err" in r2) return null;
    return r2 ?? null;
  } catch (e) {
    console.error("[backendService] getUserByMobile failed:", e);
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
async function registerAppUser(mobile, name, role, assignedHospitalId) {
  try {
    const actor = await getActor();
    const result = await actor.registerAppUser(
      mobile,
      name,
      role,
      assignedHospitalId
    );
    console.log("[backendService] registerAppUser result:", result);
    return result;
  } catch (e) {
    console.error("[backendService] registerAppUser failed:", e);
    throw e;
  }
}
const DEMO_OTP = "123456";
const OTP_EXPIRY_SECONDS = 300;
const RESEND_COOLDOWN_SECONDS = 30;
const MAX_ATTEMPTS = 3;
function OTPLoginScreen({ onSuccess }) {
  const [step, setStep] = reactExports.useState("mobile");
  const [mobile, setMobile] = reactExports.useState("");
  const [otp, setOtp] = reactExports.useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const [resendCooldown, setResendCooldown] = reactExports.useState(0);
  const [otpExpiry, setOtpExpiry] = reactExports.useState(0);
  const [attempts, setAttempts] = reactExports.useState(0);
  const otpInputRefs = reactExports.useRef([]);
  const resendTimerRef = reactExports.useRef(null);
  const expiryTimerRef = reactExports.useRef(null);
  const clearTimers = reactExports.useCallback(() => {
    if (resendTimerRef.current) clearInterval(resendTimerRef.current);
    if (expiryTimerRef.current) clearInterval(expiryTimerRef.current);
  }, []);
  reactExports.useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);
  const startTimers = reactExports.useCallback(() => {
    clearTimers();
    setResendCooldown(RESEND_COOLDOWN_SECONDS);
    setOtpExpiry(OTP_EXPIRY_SECONDS);
    resendTimerRef.current = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          if (resendTimerRef.current) clearInterval(resendTimerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
    expiryTimerRef.current = setInterval(() => {
      setOtpExpiry((prev) => {
        if (prev <= 1) {
          if (expiryTimerRef.current) clearInterval(expiryTimerRef.current);
          setError("OTP has expired. Please request a new one.");
          return 0;
        }
        return prev - 1;
      });
    }, 1e3);
  }, [clearTimers]);
  const formatTime = (seconds) => {
    const m2 = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s2 = (seconds % 60).toString().padStart(2, "0");
    return `${m2}:${s2}`;
  };
  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setError("");
    setIsLoading(true);
    await new Promise((r2) => setTimeout(r2, 800));
    setIsLoading(false);
    setAttempts(0);
    setOtp(["", "", "", "", "", ""]);
    setStep("otp");
    startTimers();
    setTimeout(() => {
      var _a2;
      return (_a2 = otpInputRefs.current[0]) == null ? void 0 : _a2.focus();
    }, 100);
  };
  const handleOtpChange = (index, value) => {
    var _a2;
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError("");
    if (digit && index < 5) {
      (_a2 = otpInputRefs.current[index + 1]) == null ? void 0 : _a2.focus();
    }
  };
  const handleOtpKeyDown = (index, e) => {
    var _a2;
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      (_a2 = otpInputRefs.current[index - 1]) == null ? void 0 : _a2.focus();
    }
    if (e.key === "Enter") {
      handleVerifyOTP();
    }
  };
  const handleOtpPaste = (e) => {
    var _a2;
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      (_a2 = otpInputRefs.current[5]) == null ? void 0 : _a2.focus();
      e.preventDefault();
    }
  };
  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }
    if (otpExpiry === 0) {
      setError("OTP has expired. Please request a new one.");
      return;
    }
    if (attempts >= MAX_ATTEMPTS) {
      setError("Maximum attempts reached. Please request a new OTP.");
      return;
    }
    setIsLoading(true);
    await new Promise((r2) => setTimeout(r2, 600));
    const isValid = enteredOtp === DEMO_OTP;
    if (isValid) {
      clearTimers();
      setIsLoading(false);
      onSuccess(mobile);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setIsLoading(false);
      const remaining = MAX_ATTEMPTS - newAttempts;
      if (remaining > 0) {
        setError(
          `Invalid OTP. ${remaining} attempt${remaining !== 1 ? "s" : ""} remaining.`
        );
      } else {
        setError("Maximum attempts reached. Please request a new OTP.");
      }
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        var _a2;
        return (_a2 = otpInputRefs.current[0]) == null ? void 0 : _a2.focus();
      }, 50);
    }
  };
  const handleResendOTP = async () => {
    if (resendCooldown > 0) return;
    setError("");
    setIsLoading(true);
    await new Promise((r2) => setTimeout(r2, 600));
    setIsLoading(false);
    setAttempts(0);
    setOtp(["", "", "", "", "", ""]);
    startTimers();
    setTimeout(() => {
      var _a2;
      return (_a2 = otpInputRefs.current[0]) == null ? void 0 : _a2.focus();
    }, 100);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full space-y-5", children: step === "mobile" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: "mobile-input",
          className: "block text-sm font-semibold text-gray-700",
          children: "Mobile Number"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-4 h-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: "mobile-input",
            type: "tel",
            inputMode: "numeric",
            maxLength: 10,
            value: mobile,
            onChange: (e) => {
              const val = e.target.value.replace(/\D/g, "").slice(0, 10);
              setMobile(val);
              setError("");
            },
            onKeyDown: (e) => {
              if (e.key === "Enter") handleSendOTP();
            },
            placeholder: "Enter 10-digit number",
            "data-ocid": "otp.mobile.input",
            className: "w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          "data-ocid": "otp.mobile.error_state",
          className: "text-xs text-red-600 font-medium",
          children: error
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleSendOTP,
        disabled: isLoading || mobile.length !== 10,
        "data-ocid": "otp.send_otp.primary_button",
        className: "w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
        style: {
          background: "linear-gradient(135deg, #2563EB, #26C6DA)"
        },
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          "Sending OTP..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          "Send OTP"
        ] })
      }
    )
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-gray-700", children: "Enter OTP" }),
        otpExpiry > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full", children: [
          "Expires in ",
          formatTime(otpExpiry)
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-500", children: [
        "Sent to +91 ",
        mobile
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 justify-center", "data-ocid": "otp.otp.input", children: otp.map((digit, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: (el) => {
          otpInputRefs.current[index] = el;
        },
        type: "tel",
        inputMode: "numeric",
        maxLength: 1,
        value: digit,
        onChange: (e) => handleOtpChange(index, e.target.value),
        onKeyDown: (e) => handleOtpKeyDown(index, e),
        onPaste: index === 0 ? handleOtpPaste : void 0,
        "data-ocid": `otp.digit.input.${index + 1}`,
        className: "w-10 h-12 text-center text-lg font-bold rounded-xl border-2 bg-gray-50 transition-all focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20",
        style: {
          borderColor: digit ? "#2563EB" : error ? "#EF4444" : "#E5E7EB",
          color: "#2563EB"
        }
      },
      index
    )) }),
    attempts > 0 && attempts < MAX_ATTEMPTS && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-600 text-center font-medium", children: [
      MAX_ATTEMPTS - attempts,
      " attempt",
      MAX_ATTEMPTS - attempts !== 1 ? "s" : "",
      " remaining"
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        "data-ocid": "otp.verify.error_state",
        className: "text-xs text-red-600 font-medium text-center",
        children: error
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: handleVerifyOTP,
        disabled: isLoading || otp.join("").length !== 6 || otpExpiry === 0 || attempts >= MAX_ATTEMPTS,
        "data-ocid": "otp.verify_otp.primary_button",
        className: "w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
        style: {
          background: isLoading || otp.join("").length !== 6 || otpExpiry === 0 || attempts >= MAX_ATTEMPTS ? "#9CA3AF" : "linear-gradient(135deg, #2563EB, #26C6DA)"
        },
        children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
          "Verifying..."
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          "Verify OTP"
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => {
            setStep("mobile");
            setOtp(["", "", "", "", "", ""]);
            setError("");
            clearTimers();
          },
          "data-ocid": "otp.back.button",
          className: "text-xs text-gray-500 hover:text-gray-700 transition-colors underline",
          children: "← Change number"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleResendOTP,
          disabled: resendCooldown > 0 || isLoading,
          "data-ocid": "otp.resend.button",
          className: "text-xs font-semibold transition-colors disabled:cursor-not-allowed",
          style: {
            color: resendCooldown > 0 ? "#9CA3AF" : "#2563EB"
          },
          children: resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend OTP"
        }
      )
    ] })
  ] }) });
}
function StaffLoginScreen() {
  const [authError, setAuthError] = reactExports.useState("");
  reactExports.useEffect(() => {
    const path = window.location.pathname;
    if (path === "/" || path === "/login") {
      localStorage.removeItem("xpertlab_session");
    }
  }, []);
  const handleOTPSuccess = async (mobile) => {
    setAuthError("");
    try {
      const user = await getUserByMobile(mobile);
      if (!user) {
        setAuthError("Account not found. Please contact administrator.");
        return;
      }
      console.log("USER:", user);
      const roleMap = {
        super_admin: "superAdmin",
        lab_admin: "labAdmin",
        phlebotomist: "phlebotomist"
      };
      const mappedRole = roleMap[user.role];
      if (!mappedRole) {
        setAuthError("Invalid role. Please contact administrator.");
        return;
      }
      localStorage.clear();
      const session = {
        userId: mobile,
        mobileNumber: mobile,
        mobile,
        role: mappedRole,
        loginType: "otp",
        loginAt: Date.now(),
        assignedHospitalId: user.assignedHospitalId || ""
      };
      console.log("Session after login:", session);
      saveSession(session);
      console.log(
        "SESSION:",
        JSON.parse(localStorage.getItem("xpertlab_session") || "{}")
      );
      if (user.role === "super_admin") {
        window.location.href = "/admin-app";
      } else if (user.role === "lab_admin") {
        window.location.href = "/staff-app";
      } else if (user.role === "phlebotomist") {
        window.location.href = "/staff-app";
      } else {
        setAuthError("Invalid role. Please contact administrator.");
      }
    } catch (e) {
      console.error("Login error:", e);
      setAuthError("Login failed. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative min-h-screen flex flex-col items-center justify-center p-4",
      style: { background: "#F7F9FC" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(HealthcareBg, { variant: "default", opacity: 0.04 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "bg-white rounded-2xl px-5 py-3.5 shadow-md mb-4",
                style: { boxShadow: "0 8px 24px rgba(37,99,235,0.10)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/logo.png",
                    alt: "XpertLab",
                    className: "h-[36px] w-auto object-contain"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h1",
                {
                  className: "font-bold text-gray-900",
                  style: { fontSize: "20px" },
                  children: "Staff Secure Login"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-500 mt-1", children: "Sign in to continue" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-white rounded-2xl p-6 space-y-5",
              style: { boxShadow: "0 8px 24px rgba(0,0,0,0.08)" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(OTPLoginScreen, { onSuccess: handleOTPSuccess }),
                authError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "mt-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3",
                    "data-ocid": "login.error_state",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-red-700 font-medium", children: authError })
                  }
                )
              ]
            }
          )
        ] })
      ]
    }
  );
}
const iconMap = {
  Home: House,
  ClipboardList,
  MapPin,
  FileText,
  User,
  FlaskConical,
  Package,
  CalendarDays,
  TestTube,
  Building2,
  BarChart3: ChartColumn,
  CalendarCheck,
  Clock,
  ShieldAlert,
  LayoutDashboard,
  Banknote,
  TrendingUp,
  Settings
};
function BottomNavigation({
  items,
  currentPath,
  onNavigate
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      style: {
        background: "#FFFFFF",
        borderTop: "1px solid #E5E7EB",
        boxShadow: "0 -8px 32px rgba(37,99,235,0.10)",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        height: "70px",
        zIndex: 100,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
      },
      children: items.map((item) => {
        const isActive = currentPath === item.path;
        const IconComponent = iconMap[item.icon] ?? House;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": `nav.${item.path.replace(/\//g, "")}.tab`,
            onClick: () => onNavigate(item.path),
            style: {
              flex: 1,
              color: isActive ? "#FFFFFF" : "#9CA3AF",
              background: "none",
              border: "none",
              cursor: "pointer",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "8px 4px",
              position: "relative",
              transition: "all 200ms ease"
            },
            children: [
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    position: "absolute",
                    left: "8px",
                    right: "8px",
                    top: "4px",
                    bottom: "4px",
                    borderRadius: "14px",
                    background: "linear-gradient(135deg, #2563EB, #06B6D4)",
                    zIndex: 0,
                    transition: "all 200ms ease",
                    boxShadow: "0 4px 12px rgba(37,99,235,0.30)"
                  }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "span",
                {
                  style: {
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transform: isActive ? "scale(1.08)" : "scale(1)",
                    zIndex: 1,
                    transition: "transform 200ms ease"
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(IconComponent, { className: "w-[22px] h-[22px]" }),
                    item.badgeCount != null && item.badgeCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        style: {
                          position: "absolute",
                          top: "-6px",
                          right: "-6px",
                          minWidth: "16px",
                          height: "16px",
                          padding: "0 2px",
                          borderRadius: "999px",
                          background: "#EF4444",
                          color: "white",
                          fontSize: "9px",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          lineHeight: 1
                        },
                        children: item.badgeCount > 99 ? "99+" : item.badgeCount
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  style: {
                    marginTop: "2px",
                    fontSize: "12px",
                    fontWeight: isActive ? 700 : 500,
                    lineHeight: 1.2,
                    zIndex: 1,
                    transition: "all 200ms ease"
                  },
                  children: item.label
                }
              )
            ]
          },
          item.path
        );
      })
    }
  );
}
function useGlobalSearch(query) {
  return React.useMemo(() => {
    var _a2;
    if (query.length < 2) return [];
    const q2 = query.toLowerCase();
    const results = [];
    try {
      const raw = localStorage.getItem("xpertlab_hospitals");
      if (raw) {
        const hospitals = JSON.parse(raw);
        for (const h2 of hospitals) {
          if (h2.name.toLowerCase().includes(q2)) {
            results.push({
              id: `hospital-${h2.id}`,
              name: h2.name,
              category: "Hospital",
              categoryColor: "#7C3AED"
            });
          }
        }
      }
    } catch {
    }
    try {
      const raw = localStorage.getItem("xpertlab_phlebotomists");
      if (raw) {
        const phlebs = JSON.parse(raw);
        for (const p2 of phlebs) {
          if (p2.name.toLowerCase().includes(q2)) {
            results.push({
              id: `phlebotomist-${p2.id}`,
              name: p2.name,
              category: "Phlebotomist",
              categoryColor: "#0D9488"
            });
          }
        }
      }
    } catch {
    }
    try {
      const raw = localStorage.getItem("xpertlab_tests");
      if (raw) {
        const tests = JSON.parse(raw);
        for (const t of tests) {
          if ((_a2 = t.testName) == null ? void 0 : _a2.toLowerCase().includes(q2)) {
            results.push({
              id: `test-${t.id}`,
              name: t.testName,
              category: "Test",
              categoryColor: "#1D4ED8"
            });
          }
        }
      }
    } catch {
    }
    return results.slice(0, 5);
  }, [query]);
}
const StaffAppLayout = ({
  children,
  currentPath,
  navItems,
  onNavigate,
  roleLabel
}) => {
  const isSuperAdmin = roleLabel === "Super Admin";
  const pendingCount = React.useMemo(() => {
    return 0;
  }, [currentPath]);
  const navItemsWithBadge = navItems.map((item) => {
    if ((item.path === "home-collection-queue" || item.path === "/home-collection-queue") && pendingCount > 0) {
      return { ...item, badgeCount: pendingCount };
    }
    return item;
  });
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [searchOpen, setSearchOpen] = reactExports.useState(false);
  const searchContainerRef = reactExports.useRef(null);
  const searchResults = useGlobalSearch(searchQuery);
  reactExports.useEffect(() => {
    function handleClick(e) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "header",
      {
        className: "sticky top-0 z-40 px-4 py-2.5 flex items-center justify-between gap-3",
        style: {
          background: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "0 2px 12px rgba(37,99,235,0.06)"
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2.5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: "/assets/logo.png",
              alt: "XpertLab",
              className: "h-[36px] w-auto object-contain"
            }
          ) }),
          isSuperAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              ref: searchContainerRef,
              className: "relative flex-1 max-w-xs mx-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      "data-ocid": "superadmin.search.input",
                      type: "text",
                      value: searchQuery,
                      onChange: (e) => {
                        setSearchQuery(e.target.value);
                        setSearchOpen(true);
                      },
                      onFocus: () => setSearchOpen(true),
                      placeholder: "Search hospitals, tests...",
                      className: "w-full py-2 pl-9 pr-3 text-sm outline-none transition-all",
                      style: {
                        background: "#F7F9FC",
                        border: "1px solid #E5E7EB",
                        borderRadius: "10px",
                        fontSize: "14px"
                      }
                    }
                  )
                ] }),
                searchOpen && searchQuery.length >= 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "absolute left-0 right-0 top-full mt-1 bg-white rounded-xl overflow-hidden z-50",
                    style: {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      border: "1px solid #E5E7EB"
                    },
                    children: searchResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 text-xs text-gray-400", children: [
                      'No results found for "',
                      searchQuery,
                      '"'
                    ] }) : searchResults.map((r2) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        className: "w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-gray-50 cursor-pointer transition-colors text-left",
                        onClick: () => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0",
                              style: { background: `${r2.categoryColor}18` },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                Search,
                                {
                                  className: "w-3 h-3",
                                  style: { color: r2.categoryColor }
                                }
                              )
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-gray-700 font-medium flex-1 truncate", children: r2.name }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: "text-xs px-2 py-0.5 rounded-full font-semibold flex-shrink-0",
                              style: {
                                background: `${r2.categoryColor}18`,
                                color: r2.categoryColor
                              },
                              children: r2.category
                            }
                          )
                        ]
                      },
                      r2.id
                    ))
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
            roleLabel && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-xs font-semibold px-3 py-1 rounded-full border",
                style: {
                  background: "rgba(37,99,235,0.06)",
                  color: "#2563EB",
                  borderColor: "rgba(37,99,235,0.18)"
                },
                children: roleLabel
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "header.profile.button",
                onClick: () => onNavigate("staff-profile"),
                className: "p-1.5 rounded-full transition-colors hover:bg-blue-50",
                title: "My Profile",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "w-6 h-6", style: { color: "#2563EB" } })
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto pb-[90px]", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      BottomNavigation,
      {
        items: navItemsWithBadge,
        currentPath,
        onNavigate
      }
    )
  ] });
};
const TaskQueuePage = reactExports.lazy(() => __vitePreload(() => import("./TaskQueuePage-Dgqf8f7W.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]) : void 0));
const ScanCampQRPage = reactExports.lazy(
  () => __vitePreload(() => import("./ScanCampQRPage-Dy8n8ALR.js"), true ? __vite__mapDeps([17,1,2,18,19,20,6,5,21,22,23,24,25,26,27]) : void 0)
);
const RecordVitalsPage = reactExports.lazy(
  () => __vitePreload(() => import("./RecordVitalsPage-C2_xJgh6.js"), true ? __vite__mapDeps([28,1,2,9,29,5,6,30]) : void 0)
);
const HomeCollectionQueuePage = reactExports.lazy(
  () => __vitePreload(() => import("./HomeCollectionQueuePage-CYoeyoea.js"), true ? __vite__mapDeps([31,1,2,23,4,5,7,8,10,32,6,27]) : void 0)
);
const PhlebotomistAttendancePage = reactExports.lazy(
  () => __vitePreload(() => import("./PhlebotomistAttendancePage-CeV9iNyr.js"), true ? __vite__mapDeps([33,1,2,22,3,9,10,5,27,13,34,6,32,7,26,4,8,24,11,12,14,15,16]) : void 0)
);
const AddHospitalSamplePage = reactExports.lazy(
  () => __vitePreload(() => import("./AddHospitalSamplePage-AxDFtyQp.js"), true ? __vite__mapDeps([35,1,2,36,37,5,27,11,16,8,38,39,6,9,3,10,12,13,14,7,15]) : void 0)
);
const MyHospitalSamplesPage = reactExports.lazy(
  () => __vitePreload(() => import("./MyHospitalSamplesPage-22Ma5YXt.js"), true ? __vite__mapDeps([40,1,2,41,42,43,44,45,20,19,46,47,48,49,5,50,51,6,4,8,11,39,52,27,53,9,3,10,12,13,14,7,15,16]) : void 0)
);
const AdminBookingsPage = reactExports.lazy(() => __vitePreload(() => import("./AdminBookingsPage-BQNKgON-.js"), true ? __vite__mapDeps([54,1,2,9,16,5,6,55]) : void 0));
const UploadReportPage = reactExports.lazy(() => __vitePreload(() => import("./UploadReportPage-Clla5Nf9.js"), true ? __vite__mapDeps([56,1,2,57,19,20,50,43,44,58,18,6,5,21,9,27,14,59,26]) : void 0));
const AdminReportsPage = reactExports.lazy(() => __vitePreload(() => import("./AdminReportsPage-CzLnlLTI.js"), true ? __vite__mapDeps([60,1,2,57,19,20,61,21,36,37,5,9,23,59,16,14,55,62,63]) : void 0));
const IncidentsPage = reactExports.lazy(() => __vitePreload(() => import("./IncidentsPage-DzGt8Vfn.js"), true ? __vite__mapDeps([64,1,2,9,6,5,8,3,10,11,12,13,14,7,15,16]) : void 0));
const AuditLogsPage = reactExports.lazy(() => __vitePreload(() => import("./AuditLogsPage-CiscnMvT.js"), true ? __vite__mapDeps([65,1,2,45,20,19,66,43,44,42,57,61,9,8,5,4,16,63,11,34,67,10,68,69]) : void 0));
const CreateCampPage = reactExports.lazy(() => __vitePreload(() => import("./CreateCampPage-Ko05-45j.js"), true ? __vite__mapDeps([70,1,2,57,19,20,50,43,44,58,18,6,5,21,27,25,71,55,7]) : void 0));
const SubmitIncidentPage = reactExports.lazy(
  () => __vitePreload(() => import("./SubmitIncidentPage-CzCe_e1O.js"), true ? __vite__mapDeps([72,1,2,9,27,5,49,24,6,68]) : void 0)
);
const AdminHospitalSamplesPage = reactExports.lazy(
  () => __vitePreload(() => import("./AdminHospitalSamplesPage-Bwq-ic7o.js"), true ? __vite__mapDeps([73,1,2,42,43,44,45,20,19,46,47,48,49,5,57,50,58,36,37,41,51,6,27,62,63,74,69,13,52,11,75,14,9,8,16,53,76]) : void 0)
);
const AdminAttendancePage = reactExports.lazy(
  () => __vitePreload(() => import("./AdminAttendancePage-D9r0AF2H.js"), true ? __vite__mapDeps([77,1,2,9,10,5,6,8]) : void 0)
);
const SecurityLogsPage = reactExports.lazy(() => __vitePreload(() => import("./SecurityLogsPage-CD2Hd_1Q.js"), true ? __vite__mapDeps([78,1,2,47,48,44,42,43,45,20,19,9,6,5,8,7]) : void 0));
const TestManagementPage = reactExports.lazy(
  () => __vitePreload(() => import("./TestManagementPage-Cw0Gg-gf.js"), true ? __vite__mapDeps([79,1,2,66,43,44,45,20,19,42,57,61,48,46,47,49,5,80,58,9,26,68,6,50,81,82,36,37,59,16,83,84,8,3,10,11,12,13,14,7,15]) : void 0)
);
const HospitalManagementPage = reactExports.lazy(
  () => __vitePreload(() => import("./HospitalManagementPage-DBTjo3oR.js"), true ? __vite__mapDeps([85,1,2,66,43,44,45,20,19,42,57,61,80,5,58,36,37,9,11,16,4,7,8]) : void 0)
);
const HospitalDetailsPage = reactExports.lazy(
  () => __vitePreload(() => import("./HospitalDetailsPage-DKMJQUVI.js"), true ? __vite__mapDeps([86,1,2,47,48,44,42,43,45,20,19,66,57,8,5,58,9,6,11,7,87,37,16,88,49]) : void 0)
);
const SuperAdminDashboardPage = reactExports.lazy(
  () => __vitePreload(() => import("./SuperAdminDashboardPage-Cvw9ZYZ5.js"), true ? __vite__mapDeps([89,1,2,3,36,37,5,9,23,39,13,11,87,14,26,75,30,90,20,83,84,10,68,8,6,12,7,15,16]) : void 0)
);
const RevenueSettlementsPage = reactExports.lazy(
  () => __vitePreload(() => import("./RevenueSettlementsPage-B-RDiNBR.js"), true ? __vite__mapDeps([91,1,2,92,48,44,51,19,20,39,5,55,10,71,11,49,83,84,16,62,87,9,81,27,37,6,36,8,3,12,13,14,7,15]) : void 0)
);
const ProfitDashboardPage = reactExports.lazy(
  () => __vitePreload(() => import("./ProfitDashboardPage-BKSW-rbW.js"), true ? __vite__mapDeps([93,1,2,9,23,82,26,5,39,13,90,20,11,83,84,8,3,6,10,12,14,7,15,16]) : void 0)
);
const SuperAdminSettingsPage = reactExports.lazy(
  () => __vitePreload(() => import("./SuperAdminSettingsPage-B1mKoVbY.js"), true ? __vite__mapDeps([94,1,2,92,48,44,51,19,20,58,36,37,5,9,13,8,76,88,49,53,3,6,10,11,12,14,7,15,16]) : void 0)
);
const StaffProfilePage = reactExports.lazy(() => __vitePreload(() => import("./StaffProfilePage-CobRFBqO.js"), true ? __vite__mapDeps([95,1,2,58,8,5,67,62,96]) : void 0));
const TasksManagementPage = reactExports.lazy(
  () => __vitePreload(() => import("./TasksManagementPage-DF7dGtvc.js"), true ? __vite__mapDeps([97,1,2,58,4,5,37,6,8,7,49,9,3,10,11,12,13,14,15,16]) : void 0)
);
function getNavItems(role) {
  if (role === "phlebotomist") {
    return [
      { label: "Home", path: "phlebotomist-attendance", icon: "Home" },
      { label: "Tasks", path: "task-queue", icon: "ClipboardList" },
      { label: "Visits", path: "home-collection-queue", icon: "MapPin" },
      { label: "Sample", path: "hospital-sample-entry", icon: "FlaskConical" },
      { label: "My Samples", path: "my-hospital-samples", icon: "Package" }
    ];
  }
  if (role === "labAdmin") {
    return [
      { label: "Dashboard", path: "admin-bookings", icon: "LayoutDashboard" },
      { label: "Hospitals", path: "hospital-management", icon: "Building2" },
      { label: "Tests", path: "test-management", icon: "TestTube" },
      {
        label: "Samples",
        path: "admin-hospital-samples",
        icon: "FlaskConical"
      },
      { label: "Revenue", path: "revenue-settlements", icon: "Banknote" }
    ];
  }
  if (role === "superAdmin") {
    return [
      {
        label: "Dashboard",
        path: "super-admin-dashboard",
        icon: "LayoutDashboard"
      },
      { label: "Tests", path: "test-management", icon: "TestTube" },
      { label: "Hospitals", path: "hospital-management", icon: "Building2" },
      { label: "Revenue", path: "revenue-settlements", icon: "Banknote" },
      { label: "Settings", path: "super-admin-settings", icon: "Settings" }
    ];
  }
  return [];
}
function getRoleLabel(role) {
  switch (role) {
    case "phlebotomist":
      return "Phlebotomist";
    case "labAdmin":
      return "Lab Admin";
    case "superAdmin":
      return "Super Admin";
    default:
      return "Staff";
  }
}
function getDefaultPage(role) {
  if (role === "phlebotomist") return "phlebotomist-attendance";
  if (role === "superAdmin") return "super-admin-dashboard";
  return "admin-bookings";
}
function AccessDenied({ message }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full py-20 text-center px-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-semibold text-foreground", children: "Access Denied" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: message })
  ] });
}
function StaffApp() {
  useQueryClient();
  const [sessionRole, setSessionRole] = reactExports.useState(null);
  const [currentPage, setCurrentPage] = reactExports.useState("");
  const [pageParams, setPageParams] = reactExports.useState({});
  const [sessionLoading, setSessionLoading] = reactExports.useState(true);
  reactExports.useRef(false);
  const handleLogout = () => {
    try {
      localStorage.clear();
    } catch (e) {
      console.error(e);
    }
    window.location.replace("/");
  };
  reactExports.useEffect(() => {
    const path = window.location.pathname;
    console.log("SESSION ON LOAD:", localStorage.getItem("xpertlab_session"));
    console.log("CURRENT PATH:", path);
    if (path === "/" || path === "/login") {
      setSessionLoading(false);
      return;
    }
    const session = getSession();
    if (session == null ? void 0 : session.role) {
      const role = session.role;
      setSessionRole(role);
      setCurrentPage(getDefaultPage(role));
    }
    setSessionLoading(false);
  }, []);
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched: profileFetched
  } = useGetCallerUserProfile();
  const effectiveRole = sessionRole ?? "superAdmin";
  reactExports.useEffect(() => {
    if (currentPage) return;
    const role = sessionRole ?? (userProfile == null ? void 0 : userProfile.appRole);
    if (!role) return;
    setCurrentPage(getDefaultPage(role));
  }, [userProfile, sessionRole, currentPage]);
  const handleNavigate = (page, params) => {
    if (page === "logout") {
      handleLogout();
      return;
    }
    setCurrentPage(page);
    setPageParams(params ?? {});
  };
  const showProfileSetup = !sessionRole && !profileLoading && profileFetched;
  if (sessionLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Loading app..." });
  if (!sessionRole) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(StaffLoginScreen, {});
  }
  const renderPage = () => {
    switch (currentPage) {
      case "super-admin-dashboard":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SuperAdminDashboardPage, {});
      case "phlebotomist-attendance":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(PhlebotomistAttendancePage, { onNavigate: handleNavigate });
      case "tasks":
      case "task-queue":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(TaskQueuePage, { role: effectiveRole, onNavigate: handleNavigate });
      case "home-collections":
      case "home-collection-queue":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(HomeCollectionQueuePage, {});
      case "hospital-sample-entry":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AddHospitalSamplePage, {});
      case "my-hospital-samples":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(MyHospitalSamplesPage, { role: effectiveRole });
      case "scan-qr":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(ScanCampQRPage, {});
      case "record-vitals":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(RecordVitalsPage, {});
      case "submit-incident":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SubmitIncidentPage, {});
      case "admin-bookings":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminBookingsPage, { onNavigate: handleNavigate });
      case "upload-report":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(UploadReportPage, { onNavigate: handleNavigate });
      case "admin-reports":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminReportsPage, { onNavigate: handleNavigate });
      case "incidents":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IncidentsPage, {});
      case "audit-logs":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AuditLogsPage, { onNavigate: handleNavigate });
      case "create-camp":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CreateCampPage, {});
      case "admin-samples":
      case "admin-hospital-samples":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminHospitalSamplesPage, {});
      case "admin-attendance":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminAttendancePage, {});
      case "security-logs":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityLogsPage, {});
      case "test-management":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(TestManagementPage, { role: effectiveRole });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, { message: "You do not have permission to access Test Management." });
      case "hospital-management":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            HospitalManagementPage,
            {
              role: effectiveRole,
              onNavigate: handleNavigate
            }
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, { message: "You do not have permission to access Hospital Management." });
      case "hospital-details":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            HospitalDetailsPage,
            {
              hospitalId: pageParams.hospitalId ?? "",
              role: effectiveRole,
              onNavigate: handleNavigate
            }
          );
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, { message: "You do not have permission to view hospital details." });
      case "revenue-settlements":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(RevenueSettlementsPage, { onNavigate: handleNavigate });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, { message: "You do not have permission to access Revenue & Settlements." });
      case "profit-dashboard":
        if (effectiveRole === "superAdmin") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfitDashboardPage, {});
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, { message: "You do not have permission to access the Profit Dashboard." });
      case "super-admin-settings":
        if (effectiveRole === "superAdmin") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SuperAdminSettingsPage, { onNavigate: handleNavigate });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, { message: "You do not have permission to access Settings." });
      case "tasks-management":
        if (effectiveRole === "superAdmin" || effectiveRole === "labAdmin") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(TasksManagementPage, { role: effectiveRole });
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AccessDenied, { message: "No permission to access Tasks." });
      case "staff-profile":
      case "profile":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(StaffProfilePage, { onNavigate: handleNavigate });
      default:
        if (effectiveRole === "phlebotomist")
          return /* @__PURE__ */ jsxRuntimeExports.jsx(PhlebotomistAttendancePage, { onNavigate: handleNavigate });
        if (effectiveRole === "superAdmin") return /* @__PURE__ */ jsxRuntimeExports.jsx(SuperAdminDashboardPage, {});
        return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminBookingsPage, { onNavigate: handleNavigate });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    showProfileSetup,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StaffAppLayout,
      {
        currentPath: currentPage,
        onNavigate: handleNavigate,
        navItems: getNavItems(effectiveRole),
        roleLabel: getRoleLabel(effectiveRole),
        onExitDemo: handleLogout,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingScreen, { message: "Loading page..." }), children: renderPage() }) })
      }
    )
  ] });
}
const StaffApp$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: StaffApp
}, Symbol.toStringTag, { value: "Module" }));
export {
  Banknote as B,
  ClipboardList as C,
  LayoutDashboard as L,
  ShieldAlert as S,
  TrendingUp as T,
  CalendarCheck as a,
  TestTube as b,
  getHospitals as c,
  getTests as d,
  createSample as e,
  getSamplesByMobile as f,
  getTasksByUser as g,
  getDashboardMetrics as h,
  CalendarDays as i,
  ChartColumn as j,
  getAllAppUsers as k,
  getAllTasks as l,
  createTask as m,
  StaffApp$1 as n,
  registerAppUser as r
};
