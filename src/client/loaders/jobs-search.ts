import JobSearch from "@client/components/JobSearch";
import loader from "@client/loader";

const nodes = document.querySelectorAll('[data-react-component="jobs-search"]');

if (nodes && nodes.length) {
  nodes.forEach((node) => loader(node, JobSearch));
}
