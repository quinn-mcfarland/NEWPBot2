#include <dpp/dpp.h>
#include "cmdrClass.h"

cmdrClass::cmdrClass() {
	cmdrName = "";
	rank = "";
	bonds = 0;
	bounties = 0;
	exploration = 0;
	warEffort = 0.0;
	influence = 0;
	installationDefense = 0;
	murder = 0;
	paxFails = 0;
	warband = 0;
	blackMarket = 0;
}

std::ostream &operator<<(std::ostream& out, const cmdrClass& c) {
	out << c.cmdrName;
	out << c.rank;
	out << c.bonds;
	out << c.bounties;
	out << c.exploration;
	out << c.warEffort;
	out << c.influence;
	out << c.installationDefense;
	out << c.murder;
	out << c.paxFails;
	out << c.warband;
	out << c.blackMarket;
	return out;
}

std::istream& operator>>(std::istream& in, cmdrClass& c) {
	in >> c.cmdrName;
	in >> c.rank;
	in >> c.bonds;
	in >> c.bounties;
	in >> c.exploration;
	in >> c.warEffort;
	in >> c.influence;
	in >> c.installationDefense;
	in >> c.murder;
	in >> c.paxFails;
	in >> c.warband;
	in >> c.blackMarket;
	return in;
}