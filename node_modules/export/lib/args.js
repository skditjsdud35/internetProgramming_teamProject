var _ = require("underscore")
var Nopt = require("nopt")

exports = module.exports = function(name, cmds) {
  this.name = name
  this.cmds = cmds
}

exports.prototype.parse = function(argv) {
  if (!argv) argv = process.argv

  var defaultLong = this.cmds.default.options
  var defaultShort = this.cmds.default.aliases
  this.parseForCommand(null, defaultLong, defaultShort)
  if (!this.cmds[this.cmd]) return this

  var long = _.extend({}, defaultLong, this.cmds[this.cmd].options)
  var short = _.extend({}, defaultShort, this.cmds[this.cmd].aliases)
  this.parseForCommand(this.cmd, long, short)
  return this
}

exports.prototype.parseForCommand = function(cmd, long, short) {
  var opts = Nopt(long, short)
  var unrecognized = _.difference(Object.keys(opts), Object.keys(long), "argv")

  if (cmd && unrecognized.length) {
    warn("Unrecognized option: " + unrecognized[0])
    this.usage(warn)
    process.exit(1)
  }

  this.opts = opts
  this.cmd = opts.argv.remain.shift()
  this.argv = opts.argv.remain
  delete opts.argv

  // Normalize aliases:
  if (typeof this.cmds[this.cmd] == "string") this.cmd = this.cmds[this.cmd]
}

exports.prototype.usage = function(print) {
  print("Usage: " + this.name + " " + this.cmds.default.usage)
  if (!this.cmds[this.cmd]) return
  print("   or: " + this.name + " " +this.cmd+ " " + this.cmds[this.cmd].usage)
}

exports.prototype.help = function() {
  this.usage(info)
  info()
  info(this.cmds[this.cmd || "default"].help.join("\n"))
}

function info(string) { process.stdout.write((string || "") + "\n") }
function warn(string) { process.stderr.write((string || "") + "\n") }
